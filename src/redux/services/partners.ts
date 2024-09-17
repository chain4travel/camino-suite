import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PartnerDataType, PartnersResponseType } from '../../@types/partners'
import { StatePartnersType } from '../../helpers/partnersReducer'

const baseUrl = 'https://dev.strapi.camino.network/api/partners'
// const baseUrl = 'https://api.strapi.camino.network/partners'

export const partnersApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: build => ({
        listPartners: build.query<PartnersResponseType, StatePartnersType>({
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
                    query += `&filters[pChainAddress][$ne]=null`
                }

                return query
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
            transformResponse: (response: PartnersResponseType) => {
                return response.data[0]
            },
        }),
        isPartner: build.query<PartnerDataType, { cChainAddress: string }>({
            query: ({ cChainAddress }) => {
                let query =
                    '?populate=*&sort[0]=companyName:asc&pagination[page]=1&pagination[pageSize]=12'
                query += `&filters[cChainAddress][$eq]=${cChainAddress}`
                return query
            },
            transformResponse: (response: PartnersResponseType) => {
                return response.data[0]
            },
        }),
    }),
})

export const { useListPartnersQuery, useFetchPartnerDataQuery, useIsPartnerQuery } = partnersApi
