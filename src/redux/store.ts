import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'

import appConfigReducer from './slices/app-config'
import network from './slices/network'
import partnersSlice from './slices/partnersSlice'
import { store } from '../App'
import themeReducer from './slices/theme'

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

export function configureAppStore() {
    const store = configureStore({
        reducer: {
            appConfig: appConfigReducer,
            theme: themeReducer,
            network: network,
            partners: partnersSlice,
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    })
    return store
}
