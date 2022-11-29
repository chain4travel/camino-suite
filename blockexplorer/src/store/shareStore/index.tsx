import React from "react";
import { Provider } from "react-redux";
import { store } from "../../App";
import { changeNetwork, changeTheme, selectedTheme } from "../app-config";
import { useAppDispatch, useAppSelector } from "../configureStore";

export const useStore = () => {
  const state = useAppSelector((state) => state);
  const selectedThemeExplorer = useAppSelector(selectedTheme);
  const dispatch = useAppDispatch();
  return {
    state,
    selectedThemeExplorer,
    changeTheme: (theme: string) => {
      dispatch(changeTheme(theme));
    },
    changeNetworkExplorer: (network: string) =>
      dispatch(changeNetwork(network)),
  };
};

export function ExplorerStoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
