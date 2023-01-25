import React from "react";
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
import SelectedNetwork from "./SelectNetwork";
import AddNewNetwork from "./AddNewNetwork";
import store from "wallet/store";
import {
  addNetworks,
  changeActiveNetwork,
  changeNetworkStatus,
  getActiveNetwork,
  getNetworks,
} from "../../redux/slices/network";
import {
  getActiveApp,
  updateAuthStatus,
  updateValues,
} from "../../redux/slices/app-config";
import { Status } from "../../@types";
import DialogAnimate from "../Animate/DialogAnimate";
import { useStore } from "Explorer/useStore";
import { logoutFromWallet, updateAssets } from "../../helpers/walletStore";

export default function NetworkSwitcher() {
  const dispatch = useAppDispatch();
  const networks = useAppSelector(getNetworks);
  const activeNetwork = useAppSelector(getActiveNetwork);
  const activeApp = useAppSelector(getActiveApp);
  const theme = useTheme();

  const {
    changeNetworkExplorer,
    resetCChainReducer,
    resetValidatorsReducer,
    resetXPChainReducer,
  } = useStore();
  const handleRemoveCustomNetwork = async () => {
    store.dispatch("Network/removeCustomNetwork", activeNetwork);
    let networks = store.getters["Network/allNetworks"];
    await switchNetwork(networks[0]);
    dispatch(addNetworks(networks));
    dispatch(changeActiveNetwork(networks[0]));
    changeNetworkExplorer(networks[0]);
  };

  const switchNetwork = async (network) => {
    try {
      dispatch(changeNetworkStatus(Status.LOADING));
      await store.dispatch("Network/setNetwork", network);
      dispatch(changeNetworkStatus(Status.SUCCEEDED));
    } catch (e) {
      store.state.Network.selectedNetwork = null;
      store.state.Network.status = "disconnected";
      if (activeApp === "wallet") logoutFromWallet();
      dispatch(updateValues(null));
      dispatch(changeNetworkStatus(Status.FAILED));
      dispatch(updateAuthStatus(false));
    } finally {
      let newSelectedNetwork = store.state.Network.selectedNetwork
        ? store.state.Network.selectedNetwork
        : network;
      dispatch(changeActiveNetwork(newSelectedNetwork));
      changeNetworkExplorer(newSelectedNetwork);
      if (store.state.Network.selectedNetwork) {
        await updateAssets();
      }
    }
  };
  const handleChangeNetwork = (selected: string) => {
    let selectedNetwork = networks.find((net) => net.name === selected);
    switchNetwork(selectedNetwork);
  };

  const [network, setNetwork] = React.useState("");

  React.useEffect(() => {
    resetCChainReducer();
    resetValidatorsReducer();
    resetXPChainReducer();
    if (activeNetwork.name) setNetwork(activeNetwork.name);
  }, [activeNetwork]); // eslint-disable-line

  const [open, setOpen] = React.useState(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Select
        value={network}
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
        <AddNewNetwork
          networks={networks}
          handleClose={handleCloseModal}
          switchNetwork={switchNetwork}
        />
      </DialogAnimate>
    </>
  );
}
