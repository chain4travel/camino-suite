import React, { useState, useEffect, useRef } from "react";
import { AppBar, Box, Typography } from "@mui/material";
import { Toolbar } from "@mui/material";
import Logo from "../Logo";
import NetworkSwitcher from "./NetworkSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getActiveNetwork } from "../../redux/slices/network";
import store from "wallet/store";
import { mountAccountMenu } from "wallet/mountAccountMenu";

import { mdiLogout, mdiWalletOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useNavigate } from "react-router-dom";
import { updateAuthStatus } from "../../redux/slices/app-config";

const LoadAccountMenu = () => {
  const ref = useRef(null);

  useEffect(() => {
    mountAccountMenu(ref.current);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div ref={ref} />
    </div>
  );
};

export default function Navbar() {
  const activeNetwork = useAppSelector(getActiveNetwork);
  const auth = useAppSelector((state) => state.appConfig.isAuth);
  const cAddress = useAppSelector(
    (state) => state.appConfig.walletStore?.activeWallet?.ethAddress
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    await store.dispatch("logout");
    dispatch(updateAuthStatus(false));
    navigate("/login");
  };

  return (
    <AppBar
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        minHeight: "65px",
      }}
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
          {auth !== false ? (
            <Box
              onClick={logout}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
              }}
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
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
              }}
            >
              <Icon path={mdiWalletOutline} size={0.7} />
              <Typography variant="subtitle1" component="span">
                Wallet
              </Typography>
            </Box>
          )}
          {auth === true && (
            <div>
              {cAddress}
              <LoadAccountMenu />
            </div>
          )}
          {/* {auth === true && <div>{cAddress}</div>} */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
