import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Box, MenuItem, Select, IconButton, useTheme } from "@mui/material";
import store from "wallet/store";
import { mountAccountMenu } from "wallet/mountAccountMenu";
import { useNavigate } from "react-router-dom";
import {
  getAccount,
  updateAuthStatus,
  updateAccount,
} from "../../redux/slices/app-config";
import { mdiLogout } from "@mdi/js";
import { styled } from "@mui/material/styles";
import Icon from "@mdi/react";
import MHidden from "../@material-extend/MHidden";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  "@media (max-width: 600px)": {
    justifyContent: "flex-start",
  },
}));

const LoadAccountMenu = (props: { type: string }) => {
  const ref = useRef(null);
  const dispatch = useAppDispatch();
  const setAccount = (account) => dispatch(updateAccount(account));
  useEffect(() => {
    mountAccountMenu(ref.current, { ...props, setAccount });
  }, []);

  return (
    <StyledBox>
      <div ref={ref} />
    </StyledBox>
  );
};
export default function LoginIcon() {
  const cAddress = useAppSelector(
    (state) => state.appConfig.walletStore?.activeWallet?.ethAddress
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const account = useAppSelector(getAccount);
  const theme = useTheme();
  const logout = async () => {
    await store.dispatch("logout");
    dispatch(updateAccount(null));
    dispatch(updateAuthStatus(false));
    navigate("/login");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.stopPropagation();
    }
  };

  return (
    <>
      <MHidden width="smUp">
        <MenuItem>
          <LoadAccountMenu type="user" />
        </MenuItem>
        <MenuItem>
          <LoadAccountMenu type="kyc" />
        </MenuItem>
        <MenuItem
          onClick={logout}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          Logout
          <IconButton>
            <Icon path={mdiLogout} size={0.8} />
          </IconButton>
        </MenuItem>
      </MHidden>
      <MHidden width="smDown">
        {cAddress && (
          <Select
            value={!account ? cAddress : <LoadAccountMenu type="" />}
            renderValue={() =>
              account ? <LoadAccountMenu type="" /> : `0x${cAddress}`
            }
            sx={{
              maxWidth: "13rem",
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiSvgIcon-root": { color: theme.palette.text.primary },
            }}
            onKeyDown={(e) => {
              handleKeyDown(e);
            }}
          >
            <MenuItem
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
              sx={{ typography: "body1", width: "100%", maxWidth: "326px" }}
            >
              <LoadAccountMenu type="user" />
            </MenuItem>
            <MenuItem
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
              sx={{ typography: "body1", width: "100%", maxWidth: "326px" }}
            >
              <LoadAccountMenu type="kyc" />
            </MenuItem>
            <MenuItem
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
              onClick={logout}
              sx={{
                typography: "body1",
                width: "100%",
                maxWidth: "326px",
                display: "flex",
                justifyContent: { xs: "flex-end", sm: "center" },
              }}
            >
              <Icon path={mdiLogout} size={0.7} />
              logout
            </MenuItem>
          </Select>
        )}
      </MHidden>
    </>
  );
}
