import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Status } from '../../@types'

type NotificationSeverityType = 'success' | 'warning' | 'info' | 'error'
interface InitialStateAppConfigType {
    activeApp: string
    status: Status
    notificationStatus: boolean
    notificationMessage: string
    notificationSeverity: NotificationSeverityType
    isAuth: boolean
    walletStore: any
    account: any
}

let initialState: InitialStateAppConfigType = {
    activeApp: 'explorer',
    status: Status.IDLE,
    walletStore: null,
    isAuth: false,
    notificationStatus: false,
    notificationSeverity: 'success',
    notificationMessage: '',
    account: null,
}

const appConfigSlice = createSlice({
    name: 'appConfig',
    initialState,
    reducers: {
        changeActiveApp: (state, { payload }) => {
            if (payload === 'Wallet') state.activeApp = 'wallet'
            else if (payload === 'Explorer') state.activeApp = 'explorer'
            else state.activeApp = ''
        },
        updateValues(state, { payload }) {
            state.walletStore = payload
        },
        updateAuthStatus(state, { payload }) {
            state.isAuth = payload
        },
        updateAccount(state, { payload }) {
            state.account = payload
        },
        updateNotificationStatus(state, { payload }) {
            state.notificationStatus = !state.notificationStatus
            if (payload && payload.severity) {
                state.notificationSeverity = state.notificationStatus ? payload.severity : ''
                state.notificationMessage = state.notificationStatus ? payload.message : ''
            }
        },
    },
})

// Select All networks
export const getActiveApp = (state: RootState) => state.appConfig.activeApp

// Select Auth Status from wallet store
export const selectAuthStatus = (state: RootState) => state.appConfig.walletStore?.isAuth

// Select Auth Status from app config
export const getAuthStatus = (state: RootState) => state.appConfig.isAuth

//select account
export const getAccount = (state: RootState) => state.appConfig.account

//select notification status
export const getNotificationStatus = (state: RootState) => state.appConfig.notificationStatus

//select notification message
export const getNotificationMessage = (state: RootState) => state.appConfig.notificationMessage

//select notification severity
export const getNotificationSeverity = (state: RootState) => state.appConfig.notificationSeverity

export const {
    changeActiveApp,
    updateValues,
    updateAuthStatus,
    updateAccount,
    updateNotificationStatus,
} = appConfigSlice.actions
export default appConfigSlice.reducer
