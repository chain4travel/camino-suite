import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchBusinessFields, fetchPartners } from './utils'

import { getPartnerData } from '../../services/partners'
import { RootState } from '../../store'

interface BusinessFieldFilter {
    name: string
    active: boolean
    fullName: string
}

export interface BusinessFieldCategory {
    category: string
    fields: BusinessFieldFilter[]
}

interface PartnersResponseType {
    data?: any[]
    meta?: any
}

interface PartnersState {
    partners: PartnersResponseType | null
    businessFields: BusinessFieldCategory[]
    filters: {
        companyName: string
        businessFields: BusinessFieldCategory[]
        onMessenger: boolean
        validators: boolean
    }
    filteredPartners: PartnersResponseType[] | null
    isLoading: boolean
    error: string | null
    partnersWithValidatorStatus: any[] | null
}

export const initialState: PartnersState = {
    partners: null,
    businessFields: [],
    filters: {
        companyName: '',
        businessFields: [],
        onMessenger: false,
        validators: false,
    },
    filteredPartners: null,
    isLoading: false,
    error: null,
    partnersWithValidatorStatus: null,
}

const partnersSlice = createSlice({
    name: 'partners',
    initialState,
    reducers: {
        setCompanyNameFilter: (state, action: PayloadAction<string>) => {
            state.filters.companyName = action.payload
        },
        setBusinessFields: (state, action: PayloadAction<BusinessFieldCategory[]>) => {
            // Ensure we're copying the array and all nested objects
            state.filters.businessFields = JSON.parse(JSON.stringify(action.payload))
        },
        updateBusinessField: (state, action: PayloadAction<BusinessFieldCategory[]>) => {
            state.businessFields = action.payload
            state.filters.businessFields = action.payload
        },
        toggleMessengerFilter: state => {
            state.filters.onMessenger = !state.filters.onMessenger
        },
        toggleValidatorsFilter: state => {
            state.filters.validators = !state.filters.validators
        },
        setPartnersWithValidatorStatus: (state, action: PayloadAction<any[]>) => {
            state.partnersWithValidatorStatus = action.payload
        },
        setFilteredPartners: (state, action: PayloadAction<PartnersResponseType['data']>) => {
            state.filteredPartners = action.payload
        },

        resetFilters: state => {
            state.filters = {
                companyName: '',
                businessFields: state.businessFields.map(category => ({
                    ...category,
                    fields: category.fields.map(field => ({
                        ...field,
                        active: false,
                    })),
                })),
                onMessenger: false,
                validators: false,
            }
            state.filteredPartners = state.partners?.data || null
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPartners.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(
                fetchPartners.fulfilled,
                (state, action: PayloadAction<PartnersResponseType>) => {
                    state.isLoading = false
                    state.partners = {
                        data: action.payload.data || [],
                        meta: action.payload.meta || {},
                    }
                },
            )
            .addCase(fetchPartners.rejected, (state, action) => {
                state.isLoading = false
                state.error = (action.payload as string) || 'Failed to fetch partners'
            })
            .addCase(fetchBusinessFields.fulfilled, (state, action) => {
                state.businessFields = action.payload
                if (!state.filters.businessFields.length) {
                    state.filters.businessFields = action.payload
                }
            })
    },
})

// select all partners
export const selectAllPartners = (state: RootState) => state.partners.partners
// select business fields
export const selectBusinessFields = (state: RootState) => state.partners.businessFields

// select partner data
export const selectPartnerData = (state: RootState, companyName: string, cChainAddress: string) => {
    return getPartnerData(state.partners.partners, companyName, cChainAddress)
}

export const {
    setCompanyNameFilter,
    setBusinessFields,
    updateBusinessField,
    toggleMessengerFilter,
    toggleValidatorsFilter,
    setPartnersWithValidatorStatus,
    setFilteredPartners,
    resetFilters,
} = partnersSlice.actions

export const selectFilteredPartners = (state: RootState) =>
    state.partners.filteredPartners || state.partners.partners?.data || []

export default partnersSlice.reducer
