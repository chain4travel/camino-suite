import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import appConfigReducer from "./slices/app-config";
import themeReducer from "./slices/theme";
import network from "./slices/network";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export function configureAppStore() {
  const store = configureStore({
    reducer: {
      appConfig: appConfigReducer,
      theme: themeReducer,
      network: network,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  return store;
}
