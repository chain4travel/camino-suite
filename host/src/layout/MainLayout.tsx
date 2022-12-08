import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import store from "wallet/store";
import { Status } from "../@types";
import { useAppDispatch } from "../hooks/reduxHooks";
import {
  addNetworks,
  changeActiveNetwork,
  changeNetworkStatus,
} from "../redux/slices/network";
import { matchNetworkStatus } from "../utils/componentsUtils";
import { Box, Toolbar, useTheme } from "@mui/material";

const MainLayout = ({ children }) => {
  const [loadNetworks, setLoadNetworks] = useState(true);
  const theme = useTheme();
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
      <Toolbar
        sx={{
          minHeight: "65px !important",
          [theme.breakpoints.up("md")]: { minHeight: "69px !important" },
        }}
      />
      {!loadNetworks && <Box sx={{ flex: 1 }}>{children}</Box>}
    </Box>
  );
};

export default MainLayout;
