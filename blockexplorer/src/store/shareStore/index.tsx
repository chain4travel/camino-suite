import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../App';
import {
  changeNetwork,
  changeTheme,
  selectedTheme,
  updateNetworks,
} from '../app-config';
import { resetCChainReducer } from '../cchainSlice';
import { useAppDispatch, useAppSelector } from '../configureStore';
import { resetValidatorsReducer } from '../validatorsSlice';
import { resetXPChainReducer } from '../xchainSlice';

export const useStore = () => {
  const state = useAppSelector(state => state);
  const selectedThemeExplorer = useAppSelector(selectedTheme);
  const dispatch = useAppDispatch();
  return {
    state,
    selectedThemeExplorer,
    changeTheme: (theme: string) => {
      dispatch(changeTheme(theme));
    },
    updateNetworks: networks => {
      dispatch(updateNetworks(networks));
    },
    resetCChainReducer: () => {
      dispatch(resetCChainReducer());
    },
    resetValidatorsReducer: () => {
      dispatch(resetValidatorsReducer());
    },
    resetXPChainReducer: () => {
      dispatch(resetXPChainReducer());
    },
    changeNetworkExplorer: (network: string) =>
      dispatch(changeNetwork(network)),
  };
};

export function ExplorerStoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
