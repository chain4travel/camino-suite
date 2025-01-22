import { getMatchingPartners, getPartnerData } from '../services/partners'

import { createSelector } from '@reduxjs/toolkit'
import { StatePartnersType } from '../../helpers/partnersReducer'
import { RootState } from '../store'

export const selectFilteredPartners = createSelector(
    [
        // Access the raw partners data directly from the component
        (_state: RootState, partners: any) => {
            return partners
        },
        (_state: RootState, _partners: any, filters: StatePartnersType) => {
            return filters
        },
    ],
    (partnersResponse, filters) => {
        if (!partnersResponse) {
            return null
        }

        let filteredPartners = partnersResponse.data

        // Apply company name filter
        if (filters.companyName) {
            filteredPartners = filteredPartners.filter(partner =>
                partner?.attributes?.companyName
                    ?.toLowerCase()
                    .includes(filters.companyName?.toLowerCase()),
            )
        }

        // Apply business fields filter
        if (filters.businessFields?.length > 0) {
            const activeFields = filters.businessFields
                .flatMap(category => category.fields)
                .filter(field => field.active)
                .map(field => field.fullName)

            if (activeFields.length > 0) {
                filteredPartners = filteredPartners.filter(partner => {
                    const partnerFields = partner?.attributes?.business_fields?.data || []
                    return activeFields.some(activeField =>
                        partnerFields.some(
                            field => field.attributes?.BusinessField === activeField,
                        ),
                    )
                })
            }
        }

        // Apply messenger filter
        if (filters.onMessenger) {
            filteredPartners = filteredPartners.filter(partner => partner.isOnMessenger)
        }

        // Apply validator filter
        if (filters.validators) {
            filteredPartners = filteredPartners.filter(partner => partner.isValidator)
        }

        const result = {
            data: filteredPartners,
            meta: partnersResponse.meta,
        }
        return result
    },
)

// select partner data based on companyName and cChainAddress
export const selectPartnerData = createSelector(
    [
        (_state: RootState) => {
            return _state.partners.partners
        },
        (state: RootState, companyName: string, cChainAddress: string) => {
            return { companyName, cChainAddress }
        },
    ],
    (partners, { companyName, cChainAddress }) => {
        if (!partners) {
            return null
        }

        return getPartnerData(partners, companyName, cChainAddress)
    },
)

// select matching partners with filters if exists
export const selectedFiltredMatchingPartners = createSelector(
    [
        (_state: RootState) => {
            return _state.partners.partners
        },
        (_state: RootState, filters: any) => {
            return filters
        },
    ],
    (partners, filters) => {
        if (!partners) {
            return null
        }
        let matchingPartners = getMatchingPartners(partners, filters)

        // Apply company name filter
        if (filters.companyName) {
            matchingPartners = matchingPartners.filter(partner =>
                partner?.attributes?.companyName
                    ?.toLowerCase()
                    .includes(filters.companyName?.toLowerCase()),
            )
        }

        // Apply business fields filter
        if (filters.businessFields?.length > 0) {
            const activeFields = filters.businessFields
                .flatMap(category => category.fields)
                .filter(field => field.active)
                .map(field => field.fullName)

            if (activeFields.length > 0) {
                matchingPartners = matchingPartners.filter(partner => {
                    const partnerFields = partner?.attributes?.business_fields?.data || []
                    return activeFields.some(activeField =>
                        partnerFields.some(
                            field => field.attributes?.BusinessField === activeField,
                        ),
                    )
                })
            }
        }

        // Apply messenger filter
        if (filters.onMessenger) {
            matchingPartners = matchingPartners.filter(partner => partner.isOnMessenger)
        }

        // Apply validator filter
        if (filters.validators) {
            matchingPartners = matchingPartners.filter(partner => partner.isValidator)
        }

        return matchingPartners
    },
)
