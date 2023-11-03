import { createAsyncThunk } from '@reduxjs/toolkit'

export const updateAuthStatus = createAsyncThunk(
    'appConfig/updateAuthStatus',
    async (payload: boolean) => {
        if (payload) {
            return true
        }
        return false
    },
)
