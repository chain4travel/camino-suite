import { RootState } from '../store'
import { StatePartnersType } from '../../helpers/partnersReducer'
import { createSelector } from '@reduxjs/toolkit'

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
                    .toLowerCase()
                    .includes(filters.companyName.toLowerCase()),
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
