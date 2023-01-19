import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Box, MenuItem, Select, Typography, useTheme } from "@mui/material";
import store from "wallet/store";
import { mountAccountMenu } from "wallet/mountAccountMenu";
import { useNavigate } from "react-router-dom";
import { updateAuthStatus } from "../../redux/slices/app-config";
import { mdiLogout, mdiWalletOutline } from "@mdi/js";
import Icon from "@mdi/react";

const LoadAccountMenu = (props: { type: string }) => {
  const ref = useRef(null);
  useEffect(() => {
    mountAccountMenu(ref.current, props);
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
export default function LoginIcon() {
  const cAddress = useAppSelector(
    (state) => state.appConfig.walletStore?.activeWallet?.ethAddress
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const logout = async () => {
    await store.dispatch("logout");
    dispatch(updateAuthStatus(false));
    navigate("/login");
  };
  return (
    <>
      {cAddress && (
        <Select
          value={cAddress ? cAddress : ""}
          renderValue={() => `0x${cAddress}`}
          sx={{
            maxWidth: "13rem",
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            ".MuiSvgIcon-root": { color: theme.palette.text.primary },
          }}
        >
          <MenuItem
            sx={{ typography: "body1", width: "100%", maxWidth: "326px" }}
          >
            <LoadAccountMenu type="user" />
          </MenuItem>
          <MenuItem
            sx={{ typography: "body1", width: "100%", maxWidth: "326px" }}
          >
            <LoadAccountMenu type="kyc" />
          </MenuItem>
          <MenuItem
            onClick={logout}
            sx={{
              typography: "body1",
              width: "100%",
              maxWidth: "326px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Icon path={mdiLogout} size={0.7} />
            logout
          </MenuItem>
        </Select>
      )}
    </>
  );
}
