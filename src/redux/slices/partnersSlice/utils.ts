import {
    getBaseUrl,
    getBusinessBaseUrl,
    getPartnersWithServices,
    groupedBusinessFields,
} from '../../services/partners'

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPartners = createAsyncThunk(
    'partners/fetchPartners',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${getBaseUrl()}?populate=*&sort[0]=companyName:asc&pagination[pageSize]=10000`,
            )

            if (!response.data || !response.data.data) {
                throw new Error('Invalid data structure received from API')
            }
            const partnersWithValidatorStatus = await getPartnersWithServices(response.data)
            return partnersWithValidatorStatus
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch partners')
        }
    },
)

export const fetchBusinessFields = createAsyncThunk(
    'partners/fetchBusinessFields',
    async (_, { rejectWithValue }) => {
        try {
            const baseUrl = getBusinessBaseUrl()
            const response = await axios.get(baseUrl)

            if (!response.data || !response.data.data) {
                throw new Error('Invalid business fields data structure')
            }

            return groupedBusinessFields(response.data.data)
        } catch (error: any) {
            console.error('Error in fetchBusinessFields:', error)
            return rejectWithValue(error.message || 'Failed to fetch business fields')
        }
    },
)
