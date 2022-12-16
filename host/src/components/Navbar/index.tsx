import React, { useState, useEffect } from "react";
import { AppBar, Box, Typography } from "@mui/material";
import { Toolbar } from "@mui/material";
import Logo from "../Logo";
import NetworkSwitcher from "./NetworkSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { useAppSelector } from "../../hooks/reduxHooks";
import { getActiveNetwork } from "../../redux/slices/network";
import store from "wallet/store";
import { mdiLogout, mdiWalletOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const activeNetwork = useAppSelector(getActiveNetwork);
  const [auth, setAuth] = useState(false);
  const logout = async () => {
    await store.dispatch("logout");
    await store.dispatch("Notifications/add", {
      title: "Logout",
      message: "You have successfully logged out of your wallet.",
    });
    setAuth(false);
  };
  const navigate = useNavigate();
  useEffect(() => {
    setInterval(() => {
      if (store.state.isAuth) setAuth(true);
    }, 1000);
  }, []);

  return (
    <AppBar
      sx={{ width: "100%", display: "flex", alignItems: "center" }}
      position="fixed"
    >
      <Toolbar
        sx={{
          width: "100%",
          maxWidth: "xl",
          display: "flex",
          height: "auto",
          p: "0",
          gap: "1rem",
          alignItems: "normal",
          justifyContent: "space-between",
        }}
      >
        <Logo />
        <Box sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <ThemeSwitcher />
          {activeNetwork && <NetworkSwitcher />}
          {auth ? (
            <Box
              onClick={logout}
              sx={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <Icon path={mdiLogout} size={0.7} />
              <Typography variant="subtitle1" component="span">
                logout
              </Typography>
            </Box>
          ) : (
            <Box
              onClick={() => {
                navigate("/login");
              }}
              sx={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <Icon path={mdiWalletOutline} size={0.7} />
              <Typography variant="subtitle1" component="span">
                Wallet
              </Typography>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
