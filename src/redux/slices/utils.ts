import { createAsyncThunk } from '@reduxjs/toolkit'
import { ava as caminoClient } from 'wallet/caminoClient'

export const updateAuthStatus = createAsyncThunk(
    'appConfig/updateAuthStatus',
    async (payload: boolean) => {
        if (payload) {
            return true
        }
        return false
    },
)

export const getCurrentValidators = createAsyncThunk('appConfig/getCurrentValidators', async () => {
    try {
        return (await caminoClient.PChain().getCurrentValidators()).validators
    } catch (e) {}
})
