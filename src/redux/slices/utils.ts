import { createAsyncThunk } from '@reduxjs/toolkit'
import useWallet from '../../hooks/useWallet'

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
    const { getCurrentValidators } = useWallet()
    try {
        return (await getCurrentValidators()).validators
    } catch (e) {}
})
