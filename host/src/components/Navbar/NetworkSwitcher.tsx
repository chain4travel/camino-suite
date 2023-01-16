import React from "react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  Button,
  MenuItem,
  Typography,
  Select,
  DialogTitle,
  useTheme,
} from "@mui/material";
import { mdiTrashCanOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { nameOfActiveNetwork } from "../../utils/componentsUtils";
import SelectedNetwork from "./SelectNetwork";
import AddNewNetwork from "./AddNewNetwork";
import { getChains } from "../../api/index";
import { useStore } from "Explorer/useStore";
import store from "wallet/store";
import {
  addNetworks,
  changeActiveNetwork,
  changeNetworkStatus,
  getActiveNetwork,
  getNetworks,
} from "../../redux/slices/network";
import { Status } from "../../@types";
import { useNavigate } from "react-router-dom";
import DialogAnimate from "../Animate/DialogAnimate";

export default function NetworkSwitcher() {
  const dispatch = useAppDispatch();
  const networks = useAppSelector(getNetworks);
  const activeNetwork = useAppSelector(getActiveNetwork);
  const theme = useTheme();
  // const { changeNetworkExplorer } = useStore();
  useEffect(() => {
    // dispatch(getChains());
  }, [activeNetwork]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRemoveCustomNetwork = () => {
    store.dispatch("Network/removeCustomNetwork", activeNetwork);
    store.dispatch(
      "Notifications/add",
      {
        title: "Network Removed",
        message: "Removed custom network.",
      },
      { root: true }
    );
    let networks = store.getters["Network/allNetworks"];
    dispatch(addNetworks(networks));
    switchNetwork(networks[0]);
    // const customNetworks = JSON.parse(
    //   localStorage.getItem("customNetworks") || "[]"
    // );
    // const newCustomNetworks = customNetworks.filter(
    //   (network: Network) => network.id !== id
    // );
    // localStorage.setItem("customNetworks", JSON.stringify(newCustomNetworks));
    // dispatch(changeNetwork("Columbus"));
    // dispatch(removeCustomNetwork(id));
  };
  // useEffect(() => {
  //   console.log(activeNetwork.name);
  // }, [networks]);
  // useEffect(() => {
  //   console.log(activeNetwork?.name);
  // }, [activeNetwork]);

  const switchNetwork = async (network) => {
    try {
      dispatch(changeNetworkStatus(Status.LOADING));
      await store.dispatch("Network/setNetwork", network);
      store.dispatch(
        "Notifications/add",
        {
          title: "Network Connected",
          message: "Connected to " + networks.name,
          type: "success",
        },
        { root: true }
      );
      dispatch(changeNetworkStatus(Status.SUCCEEDED));
    } catch (e) {
      store.state.Network.selectedNetwork = null;
      store.state.Network.status = "disconnected";
      store.dispatch(
        "Notifications/add",
        {
          title: "Connection Failed",
          message: `Failed to connect ${network.name}`,
          type: "error",
        },
        { root: true }
      );
      dispatch(changeNetworkStatus(Status.FAILED));
    } finally {
      dispatch(changeActiveNetwork(network));
    }
  };
  const handleChangeNetwork = (selected: string) => {
    let selectedNetwork = networks.find((net) => net.name === selected);
    switchNetwork(selectedNetwork);
  };

  const navigate = useNavigate();
  const [network, setNetwork] = React.useState(
    nameOfActiveNetwork(networks, activeNetwork)
  );

  // React.useMemo(() => {
  //   dispatch(resetCChainReducer());
  //   dispatch(resetValidatorsReducer());
  //   dispatch(resetXPChainReducer());
  //   if (activeNetwork === "mainnet-testnet") navigate("/mainnet");
  //   else navigate("/");
  // }, [activeNetwork]); // eslint-disable-line

  React.useEffect(() => {
    setNetwork(nameOfActiveNetwork(networks, activeNetwork));
  }, [activeNetwork]); // eslint-disable-line

  // const status = useAppSelector(selectNetworkStatus);

  const [open, setOpen] = React.useState(false);
  const [selectedNetwork, setSelectedNetwork] = React.useState(null);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModal = (event) => {
    setOpen(true);
  };

  return (
    <>
      <Select
        value={activeNetwork.name}
        onChange={(e) => {
          handleChangeNetwork(e.target.value);
        }}
        renderValue={() => <SelectedNetwork />}
        sx={{
          maxWidth: "13rem",
          ".MuiOutlinedInput-notchedOutline": { border: "none" },
          ".MuiSvgIcon-root": { color: theme.palette.text.primary },
        }}
      >
        {networks?.map((network) => (
          <MenuItem
            key={network.id}
            value={network.name}
            divider
            sx={{ gap: ".6rem", justifyContent: "space-between" }}
          >
            <Typography variant="subtitle1" component="span" noWrap>
              {network.name}
            </Typography>
            {!network.readonly && (
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
                onClick={() => handleRemoveCustomNetwork()}
              >
                <Icon path={mdiTrashCanOutline} size={0.7} color="white" />
              </Button>
            )}
          </MenuItem>
        ))}
        <MenuItem
          onClick={handleOpenModal}
          sx={{ typography: "body1", width: "100%", maxWidth: "326px" }}
        >
          Add Custom Network
        </MenuItem>
      </Select>
      <DialogAnimate open={open} onClose={handleCloseModal}>
        <DialogTitle>Add New Network</DialogTitle>
        <AddNewNetwork networks={networks} handleClose={handleCloseModal} />
      </DialogAnimate>
    </>
  );
}
