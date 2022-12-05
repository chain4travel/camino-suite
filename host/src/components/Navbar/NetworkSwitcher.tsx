import React from "react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Button, MenuItem, Typography, Select, useTheme } from "@mui/material";
import { mdiTrashCanOutline } from "@mdi/js";
import Icon from "@mdi/react";
import {
  changeNetwork,
  getActiveNetwork,
  getNetworks,
  removeCustomNetwork,
} from "../../redux/slices/app-config";
import { Network } from "../../@types/store";
import { nameOfActiveNetwork } from "../../utils/componentsUtils";
import SelectedNetwork from "./SelectNetwork";
import AddNewNetwork from "./AddNewNetwork";
import { getChains } from "../../api/index";
import { useStore } from "Explorer/useStore";
import store from "wallet/store";

export default function NetworkSwitcher() {
  const dispatch = useAppDispatch();
  const networks = useAppSelector(getNetworks);
  const activeNetwork = useAppSelector(getActiveNetwork);
  const theme = useTheme();
  const [network, setNetwork] = useState(
    nameOfActiveNetwork(networks, activeNetwork)
  );
  const { changeNetworkExplorer } = useStore();
  useEffect(() => {
    setNetwork(nameOfActiveNetwork(networks, activeNetwork));
    dispatch(getChains());
  }, [activeNetwork]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRemoveCustomNetwork = (id: string) => {
    const customNetworks = JSON.parse(
      localStorage.getItem("customNetworks") || "[]"
    );
    const newCustomNetworks = customNetworks.filter(
      (network: Network) => network.id !== id
    );
    localStorage.setItem("customNetworks", JSON.stringify(newCustomNetworks));
    dispatch(changeNetwork("Columbus"));
    dispatch(removeCustomNetwork(id));
  };
  const helloWorld = async () => {
    try {
      let networks = store.getters["Network/allNetworks"];
      // console.log(networks[1]);
      const res = await store.dispatch("Network/setNetwork", networks[1]);
      console.log(res);
      store.dispatch(
        "Notifications/add",
        {
          title: "Network Connected",
          message: "Connected to " + networks[1].name,
          type: "success",
        },
        { root: true }
      );
    } catch (e) {
      store.state.Network.selectedNetwork = null;
      store.state.Network.status = "disconnected";
      store.dispatch(
        "Notifications/add",
        {
          title: "Connection Failed",
          message: `Failed to connect ${networks[1].name}`,
          type: "error",
        },
        { root: true }
      );
    }
  };
  const changeNetworkCamino = (network: string) => {
    // let active = networks.find((item) => item.displayName === network);
    // let activeNetwork = active?.id;
    helloWorld();
    changeNetworkExplorer(network);
  };
  return (
    <Select
      value={network}
      onChange={(e) => {
        // console.log(e.target.value);
        console.log("network changed");
        changeNetworkCamino(e.target.value);
        dispatch(changeNetwork(e.target.value));
      }}
      renderValue={() => <SelectedNetwork value={network} />}
      sx={{
        maxWidth: "13rem",
        ".MuiOutlinedInput-notchedOutline": { border: "none" },
        ".MuiSvgIcon-root": { color: theme.palette.text.primary },
      }}
    >
      {networks?.map((network) => (
        <MenuItem
          key={network.id}
          value={network.displayName}
          divider
          sx={{ gap: ".6rem", justifyContent: "space-between" }}
        >
          <Typography variant="subtitle1" component="span" noWrap>
            {network.displayName}
          </Typography>
          {!network.predefined && (
            <Button
              sx={{
                width: "30px",
                height: "30px",
                backgroundColor: "secondary.main",
                borderRadius: "7px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minWidth: "auto",
                "&:hover": {
                  backgroundColor: "secondary.main",
                },
              }}
              onClick={() => handleRemoveCustomNetwork(network.id)}
            >
              <Icon path={mdiTrashCanOutline} size={0.7} color="white" />
            </Button>
          )}
        </MenuItem>
      ))}
      <AddNewNetwork />
    </Select>
  );
}
