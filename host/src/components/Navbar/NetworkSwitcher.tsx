import React from "react";
import Icon from "@mdi/react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  Button,
  MenuItem,
  Typography,
  Select,
  DialogTitle,
  useTheme,
  MenuList,
  Stack,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import { mdiDeleteOutline, mdiPlus } from "@mdi/js";
import store from "wallet/store";
import {
  getActiveApp,
  updateAuthStatus,
  updateValues,
} from "../../redux/slices/app-config";
import {
  addNetworks,
  changeActiveNetwork,
  changeNetworkStatus,
  getActiveNetwork,
  getNetworks,
  selectNetworkStatus,
} from "../../redux/slices/network";
import {
  networkStatusColor,
  networkStatusName,
} from "../../utils/networkUtils";
import DialogAnimate from "../Animate/DialogAnimate";
import MHidden from "../@material-extend/MHidden";
import AddNewNetwork from "./AddNewNetwork";
import SelectedNetwork from "./SelectNetwork";
import { Status } from "../../@types";
import { useStore } from "Explorer/useStore";
import { logoutFromWallet, updateAssets } from "../../helpers/walletStore";

export default function NetworkSwitcher() {
  const dispatch = useAppDispatch();
  const networks = useAppSelector(getNetworks);
  const activeNetwork = useAppSelector(getActiveNetwork);
  const status = useAppSelector(selectNetworkStatus);
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
      await updateAssets();
    } catch (e) {
      store.state.Network.selectedNetwork = null;
      store.state.Network.status = "disconnected";
      dispatch(changeNetworkStatus(Status.FAILED));
    } finally {
      let newSelectedNetwork = store.state.Network.selectedNetwork
        ? store.state.Network.selectedNetwork
        : network;
      dispatch(changeActiveNetwork(newSelectedNetwork));
      changeNetworkExplorer(newSelectedNetwork);
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
      {/* Mobile */}
      <MHidden width="smUp">
        <MenuList sx={{ bgcolor: "transparent" }}>
          <MenuItem
            sx={{
              typography: "h6",
              fontWeight: theme.typography.fontWeightMedium,
              color: theme.palette.text.disabled,
            }}
          >
            Networks
          </MenuItem>
          {networks?.map((network) => (
            <MenuItem
              key={network.id}
              value={network.name}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "baseline",
                color: theme.palette.text.primary,
              }}
              onClick={() => handleChangeNetwork(network.name)}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="end"
                sx={{ width: "100%", flexWrap: "wrap" }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: ".7rem" }}
                >
                  <Chip
                    sx={{
                      width: "8px",
                      height: "8px",
                      bgcolor:
                        network.name === activeNetwork.name
                          ? networkStatusColor(status)
                          : "#64748B",
                    }}
                  />
                  <Typography variant="subtitle1" component="span" noWrap>
                    {network.name}
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                {!network.readonly && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      flexBasis: "50%",
                    }}
                  >
                    <IconButton onClick={() => handleRemoveCustomNetwork()}>
                      <Icon path={mdiDeleteOutline} size={0.8} />
                    </IconButton>
                  </Box>
                )}
                <Box sx={{ flexBasis: "50%", textAlign: "right" }}>
                  {activeNetwork.name === network.name && (
                    <Typography
                      variant="caption"
                      component="span"
                      noWrap
                      sx={{
                        marginLeft: "auto",
                        color: networkStatusColor(status),
                        textTransform: "uppercase",
                        mr: "8px",
                      }}
                    >
                      {networkStatusName(status)}
                    </Typography>
                  )}
                </Box>
              </Stack>
            </MenuItem>
          ))}
          <MenuItem
            onClick={handleOpenModal}
            sx={{
              typography: "body1",
              width: "100%",
              maxWidth: "326px",
              justifyContent: "space-between",
            }}
          >
            Add Custom Network
            <IconButton>
              <Icon path={mdiPlus} size={0.8} />
            </IconButton>
          </MenuItem>
        </MenuList>
        <DialogAnimate open={open} onClose={handleCloseModal}>
          <DialogTitle>Add New Network</DialogTitle>
          <AddNewNetwork
            networks={networks}
            handleClose={handleCloseModal}
            switchNetwork={switchNetwork}
          />
        </DialogAnimate>
      </MHidden>
      {/* Desktop */}
      <MHidden width="smDown">
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
                    bgcolor: "secondary.main",
                    borderRadius: "7px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minWidth: "auto",
                    "&:hover": {
                      bgcolor: "secondary.main",
                    },
                  }}
                  onClick={() => handleRemoveCustomNetwork()}
                >
                  <Icon path={mdiDeleteOutline} size={0.7} color="white" />
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
      </MHidden>
    </>
  );
}
