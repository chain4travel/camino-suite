import { createSelector } from '@reduxjs/toolkit'
import { StatePartnersType } from '../../helpers/partnersReducer'
import { RootState } from '../store'

export const selectFilteredPartners = createSelector(
    [
        // Access the raw partners data directly from the component
        (_state: RootState, partners: any) => {
            console.log('Raw partners data in selector:', partners)
            return partners
        },
        (_state: RootState, _partners: any, filters: StatePartnersType) => {
            console.log('Current filters:', filters)
            return filters
        },
    ],
    (partnersResponse, filters) => {
        if (!partnersResponse) {
            console.log('No partners response')
            return null
        }

        let filteredPartners = partnersResponse.data
        console.log('Initial partners count:', filteredPartners.length)

        // Apply company name filter
        if (filters.companyName) {
            filteredPartners = filteredPartners.filter(partner =>
                partner?.attributes?.companyName
                    .toLowerCase()
                    .includes(filters.companyName.toLowerCase()),
            )
            console.log('After name filter:', filteredPartners.length)
        }

        // Apply business fields filter
        if (filters.businessField?.length > 0) {
            const activeFields = filters.businessField
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
                console.log('After business fields filter:', filteredPartners.length)
            }
        }

        // Apply messenger filter
        if (filters.onMessenger) {
            filteredPartners = filteredPartners.filter(partner => partner.isOnMessenger)
            console.log('After messenger filter:', filteredPartners.length)
        }

        // Apply validator filter
        if (filters.validators) {
            filteredPartners = filteredPartners.filter(partner => partner.hasValidatorAddress)
            console.log('After validator filter:', filteredPartners.length)
        }

        const result = {
            data: filteredPartners,
            meta: partnersResponse.meta,
        }
        console.log('Final filtered result:', result)
        return result
    },
)
