import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { partnersApi } from './services/partners'
import appConfigReducer from './slices/app-config'
import network from './slices/network'
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
            [partnersApi.reducerPath]: partnersApi.reducer,
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: false,
            }).concat(partnersApi.middleware),
    })
    return store
}
