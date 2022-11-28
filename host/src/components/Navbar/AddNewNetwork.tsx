import React from "react";
import { useState } from "react";
import { Network } from "../../@types/store";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useWidth from "../../hooks/useWidth";
import {
  changeNetwork,
  getNetworks,
  addCustomNetwork,
} from "../../redux/slices/app-config";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Typography,
  TextField,
  Modal,
} from "@mui/material";
import { getChains } from "../../api";

export default function AddNewNetwork() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { isDesktop } = useWidth();

  const [NewNetwork, setNewNetwork] = useState({
    id: "",
    displayName: "My New Network",
    protocol: "http",
    host: "127.0.0.1",
    magellanAddress: "http://127.0.0.1:8080" as string,
    port: 9650,
    predefined: false,
  });
  const dispatch = useAppDispatch();

  // handle duplicate network id
  const handleDuplicateNetworkId = (
    NewNetwork: Network,
    networks: Network[]
  ) => {
    if (
      networks.find(
        (item) => item.id === NewNetwork.id && item.predefined === false
      )
    ) {
      return true;
    }
    return false;
  };

  const networks = useAppSelector(getNetworks);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    NewNetwork.id = NewNetwork.displayName.replace(/\s/g, "-").toLowerCase();
    if (handleDuplicateNetworkId(NewNetwork, networks)) {
      setError("Network Name already exists");
      return;
    }
    setError("");
    if (NewNetwork.magellanAddress.length === 0)
      NewNetwork.magellanAddress = `${NewNetwork.protocol}//${NewNetwork.host}:${NewNetwork.port}`;
    const ll = localStorage.getItem("customNetworks") as string;
    const customNetworks = ll ? JSON.parse(ll) : [];
    customNetworks.push(NewNetwork);
    localStorage.setItem("customNetworks", JSON.stringify(customNetworks));
    dispatch(addCustomNetwork(NewNetwork));
    dispatch(changeNetwork(NewNetwork.displayName));
    dispatch(getChains());
    setOpen(false);
  };

  return (
    <>
      <MenuItem onClick={handleOpen}>
        <Typography variant="body1">Add New Network</Typography>
      </MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            backgroundColor: "primary.main",
            borderRadius: "7px",
            padding: "1.5rem",
            minWidth: isDesktop ? "400px" : "0px",
          }}
        >
          <FormControl fullWidth variant="filled" size="medium">
            <TextField
              id="displayName"
              label="Display Name"
              variant="outlined"
              margin="normal"
              defaultValue="My New Network"
              color="secondary"
              fullWidth
              error={handleDuplicateNetworkId(NewNetwork, networks)}
              helperText={error}
              onChange={(e) =>
                setNewNetwork({ ...NewNetwork, displayName: e.target.value })
              }
            />
            <TextField
              id="protocol"
              label="Protocol"
              variant="outlined"
              margin="normal"
              defaultValue="http"
              color="secondary"
              fullWidth
              onChange={(e) =>
                setNewNetwork({ ...NewNetwork, protocol: e.target.value })
              }
            />
            <TextField
              id="host"
              label="Host"
              variant="outlined"
              margin="normal"
              defaultValue="127.0.0.1"
              color="secondary"
              fullWidth
              onChange={(e) =>
                setNewNetwork({ ...NewNetwork, host: e.target.value })
              }
            />
            <TextField
              id="port"
              label="Port"
              variant="outlined"
              margin="normal"
              defaultValue="9650"
              fullWidth
              type="number"
              color="secondary"
              onChange={(e) =>
                setNewNetwork({ ...NewNetwork, port: Number(e.target.value) })
              }
            />
            <TextField
              id="magellanAddress"
              label="Magellan Address"
              variant="outlined"
              margin="normal"
              color="secondary"
              type="text"
              fullWidth
              onChange={(e) =>
                setNewNetwork({
                  ...NewNetwork,
                  magellanAddress: e.target.value,
                })
              }
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <Button variant="outlined" onClick={handleSubmit}>
                Add Network
              </Button>
              <Button variant="contained" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
}
