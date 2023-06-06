import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Status, SuitePlatforms } from '../../@types'
import { APPS_CONSTS } from '../../constants/apps-consts'

type NotificationSeverityType = 'success' | 'warning' | 'info' | 'error'

interface InitialStateAppConfigType {
    apps: SuitePlatforms[]
    activeApp: number
    status: Status
    notificationStatus: boolean
    notificationMessage: string
    notificationSeverity: NotificationSeverityType
    isAuth: boolean
    walletStore: any
    account: any
    showButton: boolean
}

let initialState: InitialStateAppConfigType = {
    apps: APPS_CONSTS,
    activeApp: 0,
    status: Status.IDLE,
    walletStore: null,
    isAuth: false,
    notificationStatus: false,
    notificationSeverity: 'success',
    notificationMessage: '',
    account: null,
    showButton: false,
}

const appConfigSlice = createSlice({
    name: 'appConfig',
    initialState,
    reducers: {
        changeActiveApp: (state, { payload }) => {
            state.activeApp = state.apps.indexOf(state.apps.find(app => app.name === payload))
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
        updateShowButton(state) {
            state.showButton = !state.showButton
        },
    },
})

// Select Active App
export const getActiveApp = (state: RootState) => state.appConfig.activeApp

// Select All Apps
export const getAllApps = (state: RootState) => state.appConfig.apps

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

// get selectedAlias
export const getShowButton = (state: RootState) => state.appConfig.showButton

export const {
    changeActiveApp,
    updateValues,
    updateAuthStatus,
    updateAccount,
    updateNotificationStatus,
    updateShowButton,
} = appConfigSlice.actions
export default appConfigSlice.reducer
