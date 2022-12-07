import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import store from "wallet/store";
import { Status } from "../@types";
import RenderApp from "./RenderApp";
import { useAppDispatch } from "../hooks/reduxHooks";
import {
  addNetworks,
  changeActiveNetwork,
  changeNetworkStatus,
} from "../redux/slices/network";
import { matchNetworkStatus } from "../utils/componentsUtils";
import { Box, Toolbar } from "@mui/material";

const MainLayout = ({ children }) => {
  const [loadNetworks, setLoadNetworks] = useState(true);
  const dispatch = useAppDispatch();
  const init = async () => {
    dispatch(changeNetworkStatus(Status.LOADING));
    await store.dispatch("Network/init");
    let networks = store.getters["Network/allNetworks"];
    dispatch(addNetworks(networks));
    dispatch(changeActiveNetwork(networks[1]));
    dispatch(
      changeNetworkStatus(matchNetworkStatus(store.state.Network.status))
    );
    setLoadNetworks(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Toolbar />
      {!loadNetworks && <Box sx={{ flex: 1 }}>{children}</Box>}
    </Box>
  );
};

export default MainLayout;
