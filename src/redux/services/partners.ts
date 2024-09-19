import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ethers } from 'ethers'
import store from 'wallet/store'
import { PartnerDataType, PartnersResponseType } from '../../@types/partners'
import CMAccount from '../../helpers/CMAccountManagerModule#CMAccount.json'
import CMAccountManager from '../../helpers/ManagerProxyModule#CMAccountManager.json'
import { StatePartnersType } from '../../helpers/partnersReducer'

const baseUrl = 'https://dev.strapi.camino.network/api/partners'
// const baseUrl = 'https://api.strapi.camino.network/partners'

function createPartnerContract(address: string, provider: ethers.Provider) {
    // const abi = [
    //     'function getSupportedServices() view returns (string[])',
    //     'function getWantedServices() view returns (string[])',
    // ]
    return new ethers.Contract(address, CMAccount, provider)
}

async function fetchContractServices(contractAddress: string, provider: ethers.Provider) {
    const contract = createPartnerContract(contractAddress, provider)

    try {
        const [supportedServices, wantedServices] = await Promise.all([
            contract.getSupportedServices(),
            contract.getWantedServices(),
        ])
        return { supportedServices, wantedServices }
    } catch (error) {
        console.error(`Error fetching services for ${contractAddress}:`, error)
        return { supportedServices: [], wantedServices: [] }
    }
}

async function getContractMappings(): Promise<Map<string, string>> {
    const selectedNetwork = store.getters['Network/selectedNetwork']
    const providerUrl = `${selectedNetwork.protocol}://${selectedNetwork.ip}:${selectedNetwork.port}/ext/bc/C/rpc`
    const provider = new ethers.JsonRpcProvider(providerUrl)
    const managerReadOnlyContract = new ethers.Contract(
        '0xE5B2f76C778D082b07BDd7D51FFe83E3E055B47F',
        CMAccountManager.abi,
        provider,
    )

    const mappings = new Map<string, string>()
    const CMACCOUNT_ROLE = await managerReadOnlyContract.CMACCOUNT_ROLE()
    const roleMemberCount = await managerReadOnlyContract.getRoleMemberCount(CMACCOUNT_ROLE)

    const promises = []
    for (let i = 0; i < roleMemberCount; i++) {
        promises.push(
            managerReadOnlyContract.getRoleMember(CMACCOUNT_ROLE, i).then(async role => {
                const creator = await managerReadOnlyContract.getCMAccountCreator(role)
                return { role, creator }
            }),
        )
    }

    const results = await Promise.all(promises)
    results.forEach(({ role, creator }) => {
        mappings.set(role.toLowerCase(), creator.toLowerCase())
    })

    return mappings
}

export const partnersApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: build => ({
        listPartners: build.query<any, StatePartnersType>({
            query: ({ page, companyName, businessField, validators }) => {
                let query = '?populate=*'

                if (!isNaN(page)) {
                    query += `&sort[0]=companyName:asc&pagination[page]=${page}&pagination[pageSize]=12`
                }
                if (businessField) {
                    let filterWith = businessField
                        .filter(elem => elem.active)
                        .map(elem => elem.name)
                    if (filterWith?.length > 0) {
                        filterWith.forEach((element, index) => {
                            query += `&filters[$and][${index}][business_fields][BusinessField][$eq]=${element}`
                        })
                    }
                }
                if (companyName) {
                    query += `&filters[companyName][$contains]=${companyName}`
                }
                if (validators) {
                    query += `&filters[cChainAddress][$ne]=null`
                }

                return query
            },
            async transformResponse(response: PartnersResponseType) {
                const selectedNetwork = store.getters['Network/selectedNetwork']
                const providerUrl = `${selectedNetwork.protocol}://${selectedNetwork.ip}:${selectedNetwork.port}/ext/bc/C/rpc`
                const provider = new ethers.JsonRpcProvider(providerUrl)

                const contractMappings = await getContractMappings()
                const partnersWithServices = await Promise.all(
                    response.data.map(async partner => {
                        if (partner.attributes.cChainAddress) {
                            const contractAddress = Array.from(contractMappings.entries()).find(
                                ([_, partnerAddress]) =>
                                    partnerAddress.toLowerCase() ===
                                    partner.attributes.cChainAddress.toLowerCase(),
                            )?.[0]

                            if (contractAddress) {
                                const { supportedServices, wantedServices } =
                                    await fetchContractServices(contractAddress, provider)
                                let parsedSupportedServices = []
                                if (supportedServices[0]) {
                                    parsedSupportedServices = supportedServices[0]
                                        .map((service, index) => {
                                            let capabilities = supportedServices[1][index][2].map(
                                                elem => elem,
                                            )
                                            return {
                                                name: service,
                                                fee: ethers.formatEther(
                                                    supportedServices[1][index][0],
                                                ),
                                                rackRates: supportedServices[1][index][1],
                                                capabilities: capabilities,
                                            }
                                        })
                                        .filter(service => service !== null)
                                }

                                const parsedWantedServices = wantedServices.map(elem => ({
                                    name: elem,
                                }))
                                return {
                                    ...partner,
                                    supportedServices: parsedSupportedServices,
                                    wantedServices: parsedWantedServices,
                                    contractAddress,
                                }
                            }
                        }
                        return {
                            ...partner,
                            supportedServices: [],
                            wantedServices: [],
                            contractAddress: '',
                        }
                    }),
                )
                return { ...response, data: partnersWithServices }
            },
        }),
        fetchPartnerData: build.query<
            PartnerDataType,
            { companyName: string; cChainAddress?: string }
        >({
            query: ({ companyName, cChainAddress }) => {
                if (cChainAddress) {
                    let query =
                        '?populate=*&sort[0]=companyName:asc&pagination[page]=1&pagination[pageSize]=12'
                    query += `&filters[cChainAddress][$eq]=${cChainAddress}`
                    return query
                }
                let query =
                    '?populate=*&sort[0]=companyName:asc&pagination[page]=1&pagination[pageSize]=12'
                query += `&filters[companyName][$contains]=${companyName}`
                return query
            },
            async transformResponse(response: PartnersResponseType, _meta, arg) {
                const partnerData = response.data[0]
                if (partnerData && partnerData.attributes.cChainAddress) {
                    const selectedNetwork = store.getters['Network/selectedNetwork']
                    const providerUrl = `${selectedNetwork.protocol}://${selectedNetwork.ip}:${selectedNetwork.port}/ext/bc/C/rpc`
                    const provider = new ethers.JsonRpcProvider(providerUrl)
                    const contractMappings = await getContractMappings()
                    const contractAddress = Array.from(contractMappings.entries()).find(
                        ([_, partnerAddress]) =>
                            partnerAddress.toLowerCase() ===
                            (
                                arg.cChainAddress || partnerData.attributes.cChainAddress
                            ).toLowerCase(),
                    )?.[0]
                    if (contractAddress) {
                        const { supportedServices, wantedServices } = await fetchContractServices(
                            contractAddress,
                            provider,
                        )
                        let parsedSupportedServices = []
                        if (supportedServices) {
                            parsedSupportedServices = supportedServices[0]
                                .map((service, index) => {
                                    if (
                                        supportedServices[1][index] &&
                                        Array.isArray(supportedServices[1][index])
                                    ) {
                                        let capabilities = Array.isArray(
                                            supportedServices[1][index][2],
                                        )
                                            ? supportedServices[1][index][2].map(elem => elem)
                                            : []
                                        return {
                                            name: service,
                                            fee: ethers.formatEther(supportedServices[1][index][0]),
                                            rackRates: supportedServices[1][index][1],
                                            capabilities: capabilities,
                                        }
                                    }
                                    return null
                                })
                                .filter(service => service !== null)
                        }

                        const parsedWantedServices = wantedServices.map(elem => ({
                            name: elem,
                        }))
                        return {
                            ...partnerData,
                            supportedServices: parsedSupportedServices,
                            wantedServices: parsedWantedServices,
                            contractAddress,
                        }
                    }
                }
                return {
                    ...partnerData,
                    supportedServices: [],
                    wantedServices: [],
                    contractAddress: '',
                }
            },
        }),
        isPartner: build.query<PartnerDataType, { cChainAddress: string }>({
            query: ({ cChainAddress }) => {
                let query =
                    '?populate=*&sort[0]=companyName:asc&pagination[page]=1&pagination[pageSize]=12'
                query += `&filters[cChainAddress][$eq]=${cChainAddress}`
                return query
            },
            async transformResponse(response: PartnersResponseType, _meta, { cChainAddress }) {
                const partnerData = response.data[0]
                if (partnerData && partnerData.attributes.cChainAddress) {
                    const selectedNetwork = store.getters['Network/selectedNetwork']
                    const providerUrl = `${selectedNetwork.protocol}://${selectedNetwork.ip}:${selectedNetwork.port}/ext/bc/C/rpc`
                    const provider = new ethers.JsonRpcProvider(providerUrl)

                    const contractMappings = await getContractMappings()
                    const contractAddress = Array.from(contractMappings.entries()).find(
                        ([_, partnerAddress]) =>
                            partnerAddress.toLowerCase() === cChainAddress.toLowerCase(),
                    )?.[0]

                    if (contractAddress) {
                        const { supportedServices, wantedServices } = await fetchContractServices(
                            contractAddress,
                            provider,
                        )
                        let parsedSupportedServices = []
                        if (supportedServices) {
                            parsedSupportedServices = supportedServices[0]
                                .map((service, index) => {
                                    if (
                                        supportedServices[1][index] &&
                                        Array.isArray(supportedServices[1][index])
                                    ) {
                                        let capabilities = Array.isArray(
                                            supportedServices[1][index][2],
                                        )
                                            ? supportedServices[1][index][2].map(elem => elem)
                                            : []
                                        return {
                                            name: service,
                                            fee: ethers.formatEther(supportedServices[1][index][0]),
                                            rackRates: supportedServices[1][index][1],
                                            capabilities: capabilities,
                                        }
                                    }
                                    return null
                                })
                                .filter(service => service !== null)
                        }

                        const parsedWantedServices = wantedServices.map(elem => ({
                            name: elem,
                        }))
                        return {
                            ...partnerData,
                            supportedServices: parsedSupportedServices,
                            wantedServices: parsedWantedServices,
                            contractAddress,
                        }
                    }
                }
                return {
                    ...partnerData,
                    supportedServices: [],
                    wantedServices: [],
                    contractAddress: '',
                }
            },
        }),
    }),
})

export const { useListPartnersQuery, useFetchPartnerDataQuery, useIsPartnerQuery } = partnersApi
