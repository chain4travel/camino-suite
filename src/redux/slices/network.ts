import { createSlice } from '@reduxjs/toolkit'
import { Status } from '../../@types'
import { RootState } from '../store'

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
    loading: boolean
}

let initialState: InitialStateNetworkSlice = {
    activeNetwork: undefined,
    networks: [],
    status: Status.IDLE,
    loading: false,
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
        changeLoading: (state, { payload }) => {
            state.loading = payload
        },
    },
})

// Select Active Network
export const getActiveNetwork = (state: RootState) => state.network.activeNetwork
// Select All networks
export const getNetworks = (state: RootState) => state.network.networks
// Select Network Status
export const selectNetworkStatus = (state: RootState) => state.network.status
// Select Loading Status
export const selectLoadingStatus = (state: RootState) => state.network.loading

export const { addNetworks, changeNetworkStatus, changeActiveNetwork, changeLoading } =
    appConfigSlice.actions
export default appConfigSlice.reducer
