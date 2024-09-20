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
    return new ethers.Contract(address, CMAccount, provider)
}

const getListOfBots = async contract => {
    try {
        const CHEQUE_OPERATOR_ROLE = await contract.CHEQUE_OPERATOR_ROLE()
        const roleMemberCount = await contract.getRoleMemberCount(CHEQUE_OPERATOR_ROLE)

        const botPromises = []
        for (let i = 0; i < roleMemberCount; i++) {
            botPromises.push(contract.getRoleMember(CHEQUE_OPERATOR_ROLE, i))
        }

        const bots = await Promise.all(botPromises)
        return bots
    } catch (error) {
        throw error
    }
}

const getSupportedCurrencies = async contract => {
    try {
        const offChainPaymentSupported = await contract.offChainPaymentSupported()
        const isCam = (await contract.getSupportedTokens()).find(
            elem => elem === ethers.ZeroAddress,
        )
        return { offChainPaymentSupported, isCam: !!isCam }
    } catch (error) {
        throw error
    }
}

async function fetchContractServices(contractAddress: string, provider: ethers.Provider) {
    const contract = createPartnerContract(contractAddress, provider)

    try {
        const [supportedServices, wantedServices, bots, supportedCurrencies] = await Promise.all([
            contract.getSupportedServices(),
            contract.getWantedServices(),
            getListOfBots(contract),
            getSupportedCurrencies(contract),
        ])
        return { supportedServices, wantedServices, bots, supportedCurrencies }
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

function checkMatch(data): boolean {
    if (data.supportedResult.length === 0 && data.wantedResult.length === 0) {
        return false
    }

    const supportedResultSet = new Set(data.supportedResult.map(getServiceName))
    const wantedResultSet = new Set(data.wantedResult.map(getServiceName))

    const wantedServicesSet = new Set(
        data.wantedServices.map(service => getServiceName(service.name)),
    )
    const supportedServicesSet = new Set(
        data.supportedServices.map(service => getServiceName(service.name)),
    )

    if (data.supportedResult.length === 0) {
        return Array.from(wantedResultSet).some(service => supportedServicesSet.has(service))
    }

    if (data.wantedResult.length === 0) {
        return Array.from(supportedResultSet).some(service => wantedServicesSet.has(service))
    }

    const match1 = Array.from(supportedResultSet).some(service => wantedServicesSet.has(service))
    const match2 = Array.from(wantedResultSet).some(service => supportedServicesSet.has(service))

    return match1 || match2
}

function getServiceName(fullName: unknown): string {
    if (typeof fullName !== 'string') {
        console.error(`Expected string, but got ${typeof fullName}:`, fullName)
        return ''
    }
    const parts = fullName.split('.')
    return parts[parts.length - 1] || ''
}

export const partnersApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: build => ({
        listPartners: build.query<any, StatePartnersType>({
            query: ({ page, companyName, businessField, validators, onMessenger }) => {
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
                    query += `&filters[pChainAddress][$ne]=null`
                }
                // Only add the cChainAddress filter if onMessenger is explicitly true
                if (onMessenger === true) {
                    query += `&filters[cChainAddress][$ne]=null`
                }

                return {
                    url: query,
                    method: 'GET',
                    params: { onMessenger: onMessenger === true ? 'true' : 'false' },
                }
            },
            async transformResponse(response: PartnersResponseType, meta, arg) {
                const selectedNetwork = store.getters['Network/selectedNetwork']
                if (selectedNetwork.name.toLowerCase() !== 'columbus') return response

                const providerUrl = `${selectedNetwork.protocol}://${selectedNetwork.ip}:${selectedNetwork.port}/ext/bc/C/rpc`
                const provider = new ethers.JsonRpcProvider(providerUrl)

                const contractMappings = await getContractMappings()
                const onMessenger = arg.onMessenger === true

                const partnersWithServices = await Promise.all(
                    response.data.map(async partner => {
                        if (partner.attributes.cChainAddress) {
                            const contractAddress = Array.from(contractMappings.entries()).find(
                                ([_, partnerAddress]) =>
                                    partnerAddress.toLowerCase() ===
                                    partner.attributes.cChainAddress.toLowerCase(),
                            )?.[0]

                            if (contractAddress) {
                                const {
                                    supportedServices,
                                    wantedServices,
                                    bots,
                                    supportedCurrencies,
                                } = await fetchContractServices(contractAddress, provider)

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
                                    bots,
                                    supportedCurrencies,
                                    isOnMessenger: Boolean(partner.attributes.cChainAddress),
                                }
                            }
                        }
                        // Return the partner without additional details if there's no contractAddress
                        return onMessenger
                            ? null
                            : {
                                  ...partner,
                                  supportedServices: [],
                                  wantedServices: [],
                                  contractAddress: '',
                                  bots: [],
                                  supportedCurrencies: {},
                                  isOnMessenger: false,
                              }
                    }),
                )

                // Filter out null values only if onMessenger is true
                const filteredPartners = onMessenger
                    ? partnersWithServices.filter(partner => partner !== null)
                    : partnersWithServices

                // Update the meta information to reflect the new number of results
                const updatedMeta = {
                    ...response.meta,
                    pagination: {
                        ...response.meta.pagination,
                        // total: filteredPartners.length,
                    },
                }

                return { data: filteredPartners, meta: updatedMeta }
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
                if (companyName) {
                    let query =
                        '?populate=*&sort[0]=companyName:asc&pagination[page]=1&pagination[pageSize]=12'
                    query += `&filters[companyName][$contains]=${companyName}`
                    return query
                }
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
                        const { supportedServices, wantedServices, bots, supportedCurrencies } =
                            await fetchContractServices(contractAddress, provider)
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
                            bots,
                            supportedCurrencies,
                        }
                    }
                }
                return {
                    ...partnerData,
                    supportedServices: [],
                    wantedServices: [],
                    contractAddress: '',
                    bots: [],
                    supportedCurrencies: {},
                }
            },
        }),
        listMatchingPartners: build.query<any, any>({
            query: ({
                page,
                companyName,
                businessField,
                validators,
                onMessenger,
                supportedResult,
                wantedResult,
            }) => {
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
                    query += `&filters[pChainAddress][$ne]=null`
                }
                // Only add the cChainAddress filter if onMessenger is explicitly true
                query += `&filters[cChainAddress][$ne]=null`

                return {
                    url: query,
                    method: 'GET',
                    params: {
                        onMessenger: onMessenger === true ? 'true' : 'false',
                        supportedResult: JSON.stringify(supportedResult),
                        wantedResult: JSON.stringify(wantedResult),
                    },
                }
            },
            async transformResponse(response: PartnersResponseType, meta, arg) {
                const selectedNetwork = store.getters['Network/selectedNetwork']
                if (selectedNetwork.name.toLowerCase() !== 'columbus') return response

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
                                const {
                                    supportedServices,
                                    wantedServices,
                                    bots,
                                    supportedCurrencies,
                                } = await fetchContractServices(contractAddress, provider)

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
                                const isMatch = checkMatch({
                                    supportedResult:
                                        arg.supportedResult.map(elem => elem.name) || [],
                                    wantedResult: arg.wantedResult.map(elem => elem.name) || [],
                                    supportedServices: parsedSupportedServices,
                                    wantedServices: parsedWantedServices,
                                })

                                return {
                                    ...partner,
                                    supportedServices: parsedSupportedServices,
                                    wantedServices: parsedWantedServices,
                                    contractAddress,
                                    bots,
                                    supportedCurrencies,
                                    isMatch,
                                }
                            }
                        }

                        return null // Return null for partners without a contractAddress
                    }),
                )

                // Filter out null values and non-matching partners
                const filteredPartners = partnersWithServices.filter(
                    partner => partner !== null && partner.isMatch,
                )

                // Update the meta information to reflect the new number of results
                const updatedMeta = {
                    ...response.meta,
                    pagination: {
                        ...response.meta.pagination,
                        total: filteredPartners.length,
                    },
                }

                return { data: filteredPartners, meta: updatedMeta }
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
                        const { supportedServices, wantedServices, bots, supportedCurrencies } =
                            await fetchContractServices(contractAddress, provider)
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
                            bots,
                            supportedCurrencies,
                        }
                    }
                }
                return {
                    ...partnerData,
                    supportedServices: [],
                    wantedServices: [],
                    contractAddress: '',
                    bots: [],
                    supportedCurrencies: {},
                }
            },
        }),
    }),
})

export const {
    useListPartnersQuery,
    useFetchPartnerDataQuery,
    useIsPartnerQuery,
    useListMatchingPartnersQuery,
} = partnersApi
