import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ethers } from 'ethers'
import CMAccount from '../../helpers/CMAccountManagerModule#CMAccount.json'
interface InitialStatePartner {
    CMAccountAddress: string
    isCMAccountCreated: boolean
    services: string[]
    wantedServices: string[]
    offChainPayement: boolean
    accountWritableContract: ethers.Contract | null
    accountReadContract: ethers.Contract | null
}

let initialState: InitialStatePartner = {
    CMAccountAddress: '',
    isCMAccountCreated: false,
    services: [],
    wantedServices: [],
    offChainPayement: false,
    accountReadContract: null,
    accountWritableContract: null,
}

export const updateCMAcocuntContract = createAsyncThunk(
    'partner/updateCMAccountContract',
    async ({
        contractCMAccountAddress,
        wallet,
        provider,
    }: {
        contractCMAccountAddress: string
        wallet: ethers.Wallet
        provider: ethers.Provider
    }) => {
        const accountWritableContract = new ethers.Contract(
            contractCMAccountAddress,
            CMAccount,
            wallet,
        )
        const accountReadOnlyContract = new ethers.Contract(
            contractCMAccountAddress,
            CMAccount,
            provider,
        )
    },
)

const partnerSlice = createSlice({
    name: 'partner',
    initialState,
    reducers: {
        initializeCMAccountContract: (state, { payload }) => {
            console.log(payload)
        },
    },
    extraReducers: builder => {},
})

export const {} = partnerSlice.actions
export default partnerSlice.reducer
