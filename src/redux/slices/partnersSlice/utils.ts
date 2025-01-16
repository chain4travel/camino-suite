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
    async (_, { rejectWithValue, signal }) => {
        const source = axios.CancelToken.source()

        // Cancel axios request when thunk is aborted
        signal.addEventListener('abort', () => {
            source.cancel('Operation cancelled by the user')
        })

        try {
            const response = await axios.get(
                `${getBaseUrl()}?populate=*&sort[0]=companyName:asc&pagination[pageSize]=10000`,
                { cancelToken: source.token },
            )

            if (!response.data || !response.data.data) {
                throw new Error('Invalid data structure received from API')
            }
            const partnersWithValidatorStatus = await getPartnersWithServices(response.data)
            return partnersWithValidatorStatus
        } catch (error: any) {
            if (axios.isCancel(error)) {
                return rejectWithValue('Request cancelled')
            }
            return rejectWithValue(error.message || 'Failed to fetch partners')
        }
    },
)

export const fetchBusinessFields = createAsyncThunk(
    'partners/fetchBusinessFields',
    async (_, { rejectWithValue, signal }) => {
        const source = axios.CancelToken.source()

        // Cancel axios request when thunk is aborted
        signal.addEventListener('abort', () => {
            source.cancel('Operation cancelled by the user')
        })

        try {
            const baseUrl = getBusinessBaseUrl()
            const response = await axios.get(baseUrl, { cancelToken: source.token })

            if (!response.data || !response.data.data) {
                throw new Error('Invalid business fields data structure')
            }

            return groupedBusinessFields(response.data.data)
        } catch (error: any) {
            if (axios.isCancel(error)) {
                return rejectWithValue('Request cancelled')
            }
            return rejectWithValue(error.message || 'Failed to fetch business fields')
        }
    },
)
