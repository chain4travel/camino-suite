import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ethers } from 'ethers'
import { ava as caminoClient } from 'wallet/caminoClient'
import store from 'wallet/store'
import { PartnerDataType, PartnersResponseType } from '../../@types/partners'
import {
    CONTRACTCMACCOUNTMANAGERADDRESSCAMINO,
    CONTRACTCMACCOUNTMANAGERADDRESSCOLUMBUS,
    ERC20_ABI,
} from '../../constants/apps-consts'
import CMAccount from '../../helpers/CMAccountManagerModule#CMAccount.json'
import CMAccountManager from '../../helpers/ManagerProxyModule#CMAccountManager.json'
import { BusinessField, StatePartnersType } from '../../helpers/partnersReducer'

const BASE_URLS = {
    dev: 'https://dev.strapi.camino.network/api/partners',
    prod: 'https://api.strapi.camino.network/partners',
}

const BUSINESS_BASE_URLS = {
    dev: 'https://dev.strapi.camino.network/api/business-fields',
    prod: 'https://api.strapi.camino.network/business-fields',
}

function createPartnerContract(address: string, provider: ethers.Provider) {
    try {
        const contract = new ethers.Contract(address, CMAccount, provider)
        return contract
    } catch (e) {
        return null
    }
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

const getSupportedCurrencies = async (contract, provider) => {
    try {
        const offChainPaymentSupported = await contract.offChainPaymentSupported()
        const supportedTokens = await contract.getSupportedTokens()
        let tokens = []
        for (const token of supportedTokens) {
            if (token !== ethers.ZeroAddress) {
                const tokenContract = new ethers.Contract(token, ERC20_ABI, provider)
                const name = await tokenContract.name()
                const symbol = await tokenContract.symbol()
                const decimals = await tokenContract.decimals()
                tokens.push({ name, symbol, decimals })
            }
        }
        const isCam = supportedTokens.find(elem => elem === ethers.ZeroAddress)
        return { offChainPaymentSupported, isCam: !!isCam, tokens }
    } catch (error) {
        throw error
    }
}

async function fetchContractServices(contractAddress: string, provider: ethers.Provider) {
    const contract = createPartnerContract(contractAddress, provider)

    try {
        if (contract) {
            const [supportedServices, wantedServices, bots, supportedCurrencies] =
                await Promise.all([
                    contract.getSupportedServices(),
                    contract.getWantedServices(),
                    getListOfBots(contract),
                    getSupportedCurrencies(contract, provider),
                ])
            return { supportedServices, wantedServices, bots, supportedCurrencies }
        }
        return { supportedServices: [], wantedServices: [] }
    } catch (error) {
        return { supportedServices: [], wantedServices: [] }
    }
}

async function getContractMappings(): Promise<Map<string, string>> {
    const selectedNetwork = store.getters['Network/selectedNetwork']
    const providerUrl = `${selectedNetwork.protocol}://${selectedNetwork.ip}:${selectedNetwork.port}/ext/bc/C/rpc`
    const provider = new ethers.JsonRpcProvider(providerUrl)
    let contractAddress =
        selectedNetwork.name.toLowerCase() === 'columbus'
            ? CONTRACTCMACCOUNTMANAGERADDRESSCOLUMBUS
            : CONTRACTCMACCOUNTMANAGERADDRESSCAMINO
    const managerReadOnlyContract = new ethers.Contract(
        contractAddress,
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

async function getRegisteredNode(address: string): Promise<string> {
    return await caminoClient.PChain().getRegisteredShortIDLink(address)
}
const getAddress = address => {
    if (address) {
        let res = caminoClient
            .PChain()
            .addressFromBuffer(caminoClient.PChain().parseAddress(address))
        return res
    }
    return ''
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

const getBaseUrl = () => {
    const currentPath = typeof window !== 'undefined' ? window.location.hostname : ''
    if (currentPath === 'localhost' || currentPath.includes('dev')) {
        return BASE_URLS.dev
    } else if (currentPath) {
        return BASE_URLS.prod
    } else {
        return BASE_URLS.prod
    }
}

const getBusinessBaseUrl = () => {
    const currentPath = typeof window !== 'undefined' ? window.location.hostname : ''
    if (currentPath === 'localhost' || currentPath.includes('dev')) {
        return BUSINESS_BASE_URLS.dev
    } else if (currentPath) {
        return BUSINESS_BASE_URLS.prod
    } else {
        return BUSINESS_BASE_URLS.prod
    }
}

export const groupedBusinessFields = (businessField: any) => {
    const grouped: Record<string, BusinessField> = {}
    businessField.forEach(field => {
        const [category, subCategory] = field?.attributes?.BusinessField.split(' / ')

        if (!grouped[category]) {
            grouped[category] = {
                category,
                fields: [],
            }
        }

        grouped[category].fields.push({
            name: subCategory || field?.attributes?.BusinessField,
            active: false,
            fullName: field?.attributes?.BusinessField,
        })
    })

    return Object.values(grouped)
}

export const partnersApi = createApi({
    reducerPath: 'partnersApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: build => ({
        listPartners: build.query<any, StatePartnersType>({
            query: ({ page, companyName, businessField, validators, onMessenger }) => {
                const baseUrl = getBaseUrl()

                let query = '?populate=*'
                const selectedNetwork = store.getters['Network/selectedNetwork']
                if (!isNaN(page) && !onMessenger && !validators) {
                    query += `&sort[0]=companyName:asc&pagination[page]=${page}&pagination[pageSize]=12`
                }
                if (businessField) {
                    let filterWith = businessField
                        .flatMap(elem => elem.fields.filter(field => field.active))
                        .map(field => field.fullName)
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
                    query += `&sort[0]=companyName:asc&pagination[page]=${0}&pagination[pageSize]=100&filters[$and][0][pChainAddresses][pAddress][$notNull]=true&filters[$and][1][pChainAddresses][Network][$eq]=${selectedNetwork.name.toLowerCase()}`
                }
                if (onMessenger === true) {
                    query += `&sort[0]=companyName:asc&_limit=-1&filters[$and][0][cChainAddresses][cAddress][$notNull]=true&filters[$and][1][cChainAddresses][Network][$eq]=${selectedNetwork.name.toLowerCase()}`
                }

                return {
                    url: `${baseUrl}${query}`,
                    method: 'GET',
                    params: {
                        onMessenger: onMessenger,
                        validators: validators,
                    },
                }
            },
            async transformResponse(response: PartnersResponseType, meta, arg) {
                const selectedNetwork = store.getters['Network/selectedNetwork']
                if (
                    selectedNetwork.name.toLowerCase() !== 'columbus' &&
                    selectedNetwork.name.toLowerCase() !== 'camino'
                )
                    return response

                const providerUrl = `${selectedNetwork.protocol}://${selectedNetwork.ip}:${selectedNetwork.port}/ext/bc/C/rpc`
                const provider = new ethers.JsonRpcProvider(providerUrl)

                const contractMappings = await getContractMappings()
                const onMessenger = arg.onMessenger
                const onlyValidators = arg.validators

                const partnersWithServices = await Promise.all(
                    response.data.map(async partner => {
                        let partnerCChainAddress = partner?.attributes?.cChainAddresses?.find(
                            elem => elem.Network === selectedNetwork.name.toLowerCase(),
                        )
                        if (partnerCChainAddress?.cAddress) {
                            const contractAddress = Array.from(contractMappings.entries()).find(
                                ([_, partnerAddress]) =>
                                    partnerAddress.toLowerCase() ===
                                    partnerCChainAddress?.cAddress?.toLowerCase(),
                            )?.[0]

                            if (contractAddress) {
                                const {
                                    supportedServices,
                                    wantedServices,
                                    bots,
                                    supportedCurrencies,
                                } = await fetchContractServices(contractAddress, provider)

                                let parsedSupportedServices = []
                                if (
                                    supportedServices &&
                                    supportedServices.length > 0 &&
                                    supportedServices[0]
                                ) {
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
                                    isOnMessenger: Boolean(partnerCChainAddress?.cAddress),
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
                let validators = (await caminoClient.PChain().getCurrentValidators()).validators
                let partnersWithValidatorStatus = await Promise.all(
                    filteredPartners.map(async p => {
                        let pChainAddress = p.attributes.pChainAddresses.find(
                            elem =>
                                elem.Network.toLowerCase() === selectedNetwork.name.toLowerCase(),
                        )
                        if (pChainAddress?.pAddress) {
                            try {
                                let nodeID = await getRegisteredNode(
                                    getAddress(pChainAddress?.pAddress),
                                )
                                let isValidator = !!validators.find(v => v.nodeID === nodeID)
                                if (isValidator) return { ...p, isValidator: true }
                                else return { ...p, isValidator: false }
                            } catch (error) {
                                return { ...p, isValidator: false }
                            }
                        }
                        return { ...p, isValidator: false }
                    }),
                )
                const filteredValidatorsPartners = onlyValidators
                    ? partnersWithValidatorStatus.filter(partner => partner.isValidator)
                    : partnersWithValidatorStatus
                // Update the meta information to reflect the new number of results
                const updatedMeta = {
                    ...response.meta,
                    pagination: {
                        ...response.meta.pagination,
                        total:
                            onMessenger || onlyValidators
                                ? filteredValidatorsPartners.length
                                : response.meta.pagination.total,
                    },
                }
                return { data: filteredValidatorsPartners, meta: updatedMeta }
            },
        }),
        fetchPartnerData: build.query<
            PartnerDataType,
            { companyName: string; cChainAddress?: string }
        >({
            query: ({ companyName, cChainAddress }) => {
                const baseUrl = getBaseUrl()
                if (!baseUrl) {
                    throw new Error('Base URL is undefined')
                }

                let query =
                    '?populate=*&sort[0]=companyName:asc&pagination[page]=1&pagination[pageSize]=12'

                if (cChainAddress) {
                    const selectedNetwork = store.getters['Network/selectedNetwork']
                    if (!selectedNetwork) {
                        throw new Error('Selected network is undefined')
                    }
                    query += `&filters[$and][0][cChainAddresses][cAddress][$containsi]=${cChainAddress}&filters[$and][1][cChainAddresses][Network][$eq]=${selectedNetwork.name.toLowerCase()}`
                } else if (companyName) {
                    query += `&filters[companyName][$contains]=${companyName}`
                }
                return {
                    url: `${baseUrl}${query}`,
                    method: 'GET',
                }
            },
            async transformResponse(response: PartnersResponseType, _meta, arg) {
                const partnerData = response.data[0]
                const selectedNetwork = store.getters['Network/selectedNetwork']
                let partnerCChainAddress = partnerData?.attributes?.cChainAddresses.find(
                    elem => elem.Network === selectedNetwork.name.toLowerCase(),
                )

                if (partnerData && partnerCChainAddress?.cAddress) {
                    const selectedNetwork = store.getters['Network/selectedNetwork']
                    const providerUrl = `${selectedNetwork.protocol}://${selectedNetwork.ip}:${selectedNetwork.port}/ext/bc/C/rpc`
                    const provider = new ethers.JsonRpcProvider(providerUrl)
                    const contractMappings = await getContractMappings()
                    const contractAddress = Array.from(contractMappings.entries()).find(
                        ([_, partnerAddress]) =>
                            partnerAddress.toLowerCase() ===
                            (arg.cChainAddress || partnerCChainAddress?.cAddress).toLowerCase(),
                    )?.[0]
                    if (contractAddress) {
                        const { supportedServices, wantedServices, bots, supportedCurrencies } =
                            await fetchContractServices(contractAddress, provider)
                        let parsedSupportedServices = []
                        if (supportedServices && supportedServices?.length > 0) {
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
                const baseUrl = getBaseUrl()
                let query = '?populate=*'
                const selectedNetwork = store.getters['Network/selectedNetwork']

                if (!isNaN(page)) {
                    query += `&sort[0]=companyName:asc&_limit=-1`
                }
                if (businessField) {
                    let filterWith = businessField
                        .flatMap(elem => elem.fields.filter(field => field.active))
                        .map(field => field.fullName)
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
                    query += `&filters[$and][0][pChainAddresses][pAddress][$notNull]=true&filters[$and][1][pChainAddresses][Network][$eq]=${selectedNetwork.name.toLowerCase()}`
                }
                // Only add the cChainAddress filter if onMessenger is explicitly true
                query += `&filters[$and][0][cChainAddresses][cAddress][$notNull]=true&filters[$and][1][cChainAddresses][Network][$eq]=${selectedNetwork.name.toLowerCase()}`

                return {
                    url: `${baseUrl}${query}`,
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
                if (
                    selectedNetwork.name.toLowerCase() !== 'columbus' &&
                    selectedNetwork.name.toLowerCase() !== 'camino'
                )
                    return response

                const providerUrl = `${selectedNetwork.protocol}://${selectedNetwork.ip}:${selectedNetwork.port}/ext/bc/C/rpc`
                const provider = new ethers.JsonRpcProvider(providerUrl)

                const contractMappings = await getContractMappings()

                const partnersWithServices = await Promise.all(
                    response.data.map(async partner => {
                        let partnerCChainAddress = partner?.attributes?.cChainAddresses.find(
                            elem => elem.Network === selectedNetwork.name.toLowerCase(),
                        )
                        if (partnerCChainAddress?.cAddress) {
                            const contractAddress = Array.from(contractMappings.entries()).find(
                                ([_, partnerAddress]) =>
                                    partnerAddress.toLowerCase() ===
                                    partnerCChainAddress?.cAddress.toLowerCase(),
                            )?.[0]

                            if (contractAddress) {
                                const {
                                    supportedServices,
                                    wantedServices,
                                    bots,
                                    supportedCurrencies,
                                } = await fetchContractServices(contractAddress, provider)

                                let parsedSupportedServices = []
                                if (
                                    supportedServices &&
                                    supportedServices.length > 0 &&
                                    supportedServices[0]
                                ) {
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
                const baseUrl = getBaseUrl()
                const selectedNetwork = store.getters['Network/selectedNetwork']
                let query =
                    '?populate=*&sort[0]=companyName:asc&pagination[page]=1&pagination[pageSize]=12'
                query += `&filters[$and][0][cChainAddresses][cAddress][$containsi]=${cChainAddress}&filters[$and][1][cChainAddresses][Network][$eq]=${selectedNetwork.name.toLowerCase()}`
                return `${baseUrl}${query}`
            },
            async transformResponse(response: PartnersResponseType, _meta, { cChainAddress }) {
                const partnerData = response.data[0]
                const selectedNetwork = store.getters['Network/selectedNetwork']
                let partnerCChainAddress = partnerData?.attributes?.cChainAddresses.find(
                    elem => elem.Network === selectedNetwork.name.toLowerCase(),
                )
                if (partnerData && partnerCChainAddress?.cAddress) {
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
                        if (
                            supportedServices &&
                            supportedServices?.length > 0 &&
                            supportedServices[0]
                        ) {
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
        getBusinessFields: build.query<any, void>({
            query: () => getBusinessBaseUrl(),
            transformResponse(response: PartnersResponseType) {
                return groupedBusinessFields(response.data)
            },
        }),
    }),
})

export const {
    useListPartnersQuery,
    useFetchPartnerDataQuery,
    useIsPartnerQuery,
    useListMatchingPartnersQuery,
    useGetBusinessFieldsQuery,
} = partnersApi
