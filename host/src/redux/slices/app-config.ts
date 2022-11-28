import { createSlice } from "@reduxjs/toolkit";
import { getChains } from "../../api";
import { RootState } from "../store";
import { Status, Chain, Network } from "../../@types";

interface IChain {
  alias: string;
  chainID: string;
}

interface initialStateAppConfigType {
  activeNetwork?: string;
  activeApp: string;
  networks: Network[];
  chains: IChain[];
  status: Status;
}

const getNetworkFromLocalStorage = () => {
  let activeNetwork = localStorage.getItem("activeNetwork") || undefined;

  if (activeNetwork) return JSON.parse(activeNetwork);
  else {
    localStorage.setItem("activeNetwork", JSON.stringify("camino-testnet"));
    return "camino-testnet";
  }
};

const getCustomNetworksFromLocalStorage = () => {
  let customNetworks = localStorage.getItem("customNetworks");
  if (customNetworks) return JSON.parse(customNetworks);

  return [];
};

export const networks = [
  {
    id: "camino-testnet",
    displayName: "Columbus",
    protocol: "https",
    host: "columbus.camino.foundation",
    magellanAddress: "https://magellan.columbus.camino.foundation",
    port: 443,
    predefined: true,
  },
  {
    id: "mainnet",
    displayName: "Mainnet",
    protocol: "https",
    host: "columbus.camino.foundation",
    magellanAddress: "https://magellan.columbus.camino.foundation",
    port: 443,
    predefined: true,
  },
  ...(getCustomNetworksFromLocalStorage() as Network[]),
];

let initialState: initialStateAppConfigType = {
  activeNetwork: getNetworkFromLocalStorage(),
  activeApp: "blockexplorer",
  networks: [
    {
      id: "camino-testnet",
      displayName: "Columbus",
      protocol: "https",
      host: "columbus.camino.foundation",
      magellanAddress: "https://magellan.columbus.camino.foundation",
      port: 443,
      predefined: true,
    },
    {
      id: "mainnet",
      displayName: "Mainnet",
      protocol: "https",
      host: "columbus.camino.foundation",
      magellanAddress: "https://magellan.columbus.camino.foundation",
      port: 443,
      predefined: true,
    },
    ...(getCustomNetworksFromLocalStorage() as Network[]),
  ],
  chains: [],
  status: Status.IDLE,
};

const appConfigSlice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {
    changeNetwork: (state, action) => {
      let active = state.networks.find(
        (item) => item.displayName === action.payload
      );
      state.activeNetwork = active?.id;
      localStorage.setItem("activeNetwork", JSON.stringify(active?.id));
    },
    addCustomNetwork: (state, action) => {
      state.networks = [...state.networks, action.payload];
    },
    removeCustomNetwork: (state, action) => {
      state.networks = state.networks.filter(
        (item) => item.id !== action.payload
      );
    },
    resetChains: (state) => {
      state.chains = [];
    },
    changeActiveApp: (state, { payload }) => {
      console.log(payload);
      if (payload === "Wallet") state.activeApp = "wallet";
      else if (payload === "Explorer") state.activeApp = "blockexplorer";
      else state.activeApp = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getChains.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getChains.fulfilled, (state, { payload }) => {
        state.chains = Object.entries(payload.chains).map(([key, value]) => {
          let v = value as Chain;
          return { alias: v.chainAlias, chainID: v.chainID };
        });
        state.status = Status.SUCCEEDED;
      })
      .addCase(getChains.rejected, (state) => {
        state.status = Status.FAILED;
      });
  },
});

// Select Active Network
export const getActiveNetwork = (state: RootState) =>
  state.appConfig.activeNetwork;
// Select magellanAddress
export const selectMagellanAddress = (state: RootState) => {
  // state.appConfig.networks.filter()
  let networks = state.appConfig;
  let activeNetwork = networks.networks.find(
    (element) => element.id === networks.activeNetwork
  );
  return activeNetwork?.magellanAddress;
};

// Select All networks
export const getNetworks = (state: RootState) => state.appConfig.networks;
// Select All networks
export const getActiveApp = (state: RootState) => state.appConfig.activeApp;
// Select All chains
export const selectAllChains = (state: RootState) => state.appConfig.chains;
// Select All chain
// export const selectChain = (state: RootState, location: string) => {
//   return state.appConfig.chains;
// };
// Select Network Status
export const selectNetworkStatus = (state: RootState) => state.appConfig.status;

export const {
  changeNetwork,
  addCustomNetwork,
  removeCustomNetwork,
  resetChains,
  changeActiveApp,
} = appConfigSlice.actions;
export default appConfigSlice.reducer;
