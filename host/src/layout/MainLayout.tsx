import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import store from "wallet/store";
import { Status } from "../@types";
import { useAppDispatch } from "../hooks/reduxHooks";
import network, {
  addNetworks,
  changeActiveNetwork,
  changeNetworkStatus,
} from "../redux/slices/network";
import { matchNetworkStatus } from "../utils/componentsUtils";
import { Box, Toolbar, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import { changeActiveApp } from "../redux/slices/app-config";
import { useStore } from "Explorer/useStore";

const MainLayout = ({ children }) => {
  const [loadNetworks, setLoadNetworks] = useState(true);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { updateNetworks, changeNetworkExplorer } = useStore();
  const location = useLocation();
  const init = async () => {
    if (location.pathname.split("/")[1] === "wallet")
      dispatch(changeActiveApp("Wallet"));
    else if (location.pathname.split("/")[1] === "explorer")
      dispatch(changeActiveApp("Explorer"));
    dispatch(changeNetworkStatus(Status.LOADING));
    await store.dispatch("Network/init");
    await store.dispatch("Assets/initErc20List");
    await store.dispatch("Assets/ERCNft/init");
    await store.dispatch("updateAvaxPrice");
    let networks = store.getters["Network/allNetworks"];
    dispatch(addNetworks(networks));
    let selectedNetwork = store.state.Network.selectedNetwork
      ? store.state.Network.selectedNetwork
      : networks[1];
    dispatch(changeActiveNetwork(selectedNetwork));
    dispatch(
      changeNetworkStatus(matchNetworkStatus(store.state.Network.status))
    );
    updateNetworks(networks);
    changeNetworkExplorer(selectedNetwork);
    setLoadNetworks(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Navbar />
      <Toolbar
        sx={{
          minHeight: "65px !important",
          [theme.breakpoints.up("md")]: { minHeight: "69px !important" },
        }}
      />
      {!loadNetworks && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </Box>
      )}
      <Footer />
    </Box>
  );
};

export default MainLayout;
