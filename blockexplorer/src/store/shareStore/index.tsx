import React, { useContext } from "react";
import { Provider } from "react-redux";
import { store } from "../../App";
import { changeNetwork, changeTheme } from "../app-config";
import { useAppDispatch, useAppSelector } from "../configureStore";
import { useTheme } from "@mui/material";
import { ColorModeContext } from "../../styles/theme/ThemeProvider";
// import { ColorModeContext } from

export const useStore = () => {
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const themeContext = useContext(ColorModeContext);
  const themeMode = theme.palette.mode === "light" ? true : false;
  return {
    state,
    // changeNetworkExplorer: () => console.log("tettatsdfsd"),
    changeTheme: (theme: string) => dispatch(changeTheme(theme)),
    changeNetworkExplorer: (network: string) =>
      dispatch(changeNetwork(network)),
  };
};

export function ExplorerStoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
