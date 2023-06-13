import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Status } from '../../@types'

export enum NetworkID {
    MAINNET = 1000,
    TESTNET = 1001,
}
export interface NetworkType {
    withCredentials: boolean
    id: number
    name: string
    explorerUrl: string
    explorerSiteUrl: string
    signavaultUrl: string
    protocol: string
    port: number
    ip: string
    url: string
    networkId: number
    readonly: boolean
}

interface InitialStateNetworkSlice {
    activeNetwork?: NetworkType
    networks: NetworkType[]
    status: Status
}

let initialState: InitialStateNetworkSlice = {
    activeNetwork: undefined,
    networks: [],
    status: Status.IDLE,
}

const appConfigSlice = createSlice({
    name: 'network',
    initialState,
    reducers: {
        addNetworks: (state, { payload }) => {
            state.networks = [...payload]
        },
        changeNetworkStatus: (state, { payload }) => {
            state.status = payload
        },
        changeActiveNetwork: (state, { payload }) => {
            state.activeNetwork = payload
        },
    },
})

// Select Active Network
export const getActiveNetwork = (state: RootState) => state.network.activeNetwork
// Select All networks
export const getNetworks = (state: RootState) => state.network.networks
// Select Network Status
export const selectNetworkStatus = (state: RootState) => state.network.status

export const { addNetworks, changeNetworkStatus, changeActiveNetwork } = appConfigSlice.actions
export default appConfigSlice.reducer
