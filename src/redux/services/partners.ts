import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PartnerDataType, PartnersResponseType } from '../../@types/partners'
import { StatePartnersType } from '../../helpers/partnersReducer'

const baseUrl = 'https://api.strapi.camino.network/partners'

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
                    query += `&filters[isConsortiumMember][$eq]=true`
                }

                return query
            },
        }),
        fetchPartnerData: build.query<PartnerDataType, { companyName: string }>({
            query: ({ companyName }) => {
                let query =
                    '?populate=*&sort[0]=companyName:asc&pagination[page]=1&pagination[pageSize]=12'
                query += `&filters[companyName][$contains]=${companyName}`
                return query
            },
            transformResponse: (response: PartnersResponseType) => {
                return response.data[0]
            },
        }),
    }),
})

export const { useListPartnersQuery, useFetchPartnerDataQuery } = partnersApi
