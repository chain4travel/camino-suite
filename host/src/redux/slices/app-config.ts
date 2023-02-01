import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Status } from "../../@types";

interface IChain {
  alias: string;
  chainID: string;
}

interface initialStateAppConfigType {
  activeApp: string;
  status: Status;
  isAuth: boolean;
  walletStore: any;
  account: any;
}

let initialState: initialStateAppConfigType = {
  activeApp: "explorer",
  status: Status.IDLE,
  walletStore: null,
  isAuth: false,
  account: null,
};

const appConfigSlice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {
    changeActiveApp: (state, { payload }) => {
      if (payload === "Wallet") state.activeApp = "wallet";
      else if (payload === "Explorer") state.activeApp = "explorer";
      else state.activeApp = "";
    },
    updateValues(state, { payload }) {
      state.walletStore = payload;
    },
    updateAuthStatus(state, { payload }) {
      state.isAuth = payload;
    },
    updateAccount(state, { payload }) {
      state.account = payload;
    },
  },
});

// Select All networks
export const getActiveApp = (state: RootState) => state.appConfig.activeApp;
// Select Auth Status
export const selectAuthStatus = (state: RootState) =>
  state.appConfig.walletStore?.isAuth;
export const getAuthStatus = (state: RootState) => state.appConfig.isAuth;

//select account
export const getAccount = (state: RootState) => state.appConfig.account;

export const {
  changeActiveApp,
  updateValues,
  updateAuthStatus,
  updateAccount,
} = appConfigSlice.actions;
export default appConfigSlice.reducer;
