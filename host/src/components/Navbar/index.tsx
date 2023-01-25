import React, { useState } from "react";
import Icon from "@mdi/react";
import {
  AppBar,
  Box,
  Typography,
  Drawer,
  Stack,
  useTheme,
  IconButton,
} from "@mui/material";
import { Toolbar } from "@mui/material";
import { mdiClose, mdiMenu, mdiWalletOutline } from "@mdi/js";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { getActiveNetwork } from "../../redux/slices/network";
import PlatformSwitcher from "../PlatformSwitcher";
import NetworkSwitcher from "./NetworkSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import LoginButton from "./LoginButton";
import MHidden from "../@material-extend/MHidden";
import MIconButton from "../@material-extend/MIconButton";

const DRAWER_WIDTH = 300;

export default function Navbar() {
  const theme = useTheme();
  const activeNetwork = useAppSelector(getActiveNetwork);
  const auth = useAppSelector((state) => state.appConfig.isAuth);
  const navigate = useNavigate();

  const [openSidebar, setOpenSidebar] = useState(false);
  const handleCloseSidebar = () => {
    setOpenSidebar(false);
  };
  const handleOpenSidebar = () => {
    setOpenSidebar(true);
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
        <PlatformSwitcher />
        <Box sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          {/* Mobile */}
          <MHidden width="smUp">
            {!auth && (
              <Box
                onClick={() => navigate("/login")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  cursor: "pointer",
                }}
              >
                <Icon path={mdiWalletOutline} size={1} />
              </Box>
            )}
            <Drawer
              anchor="right"
              ModalProps={{ keepMounted: true }}
              open={openSidebar}
              onClose={handleCloseSidebar}
              sx={{
                "& .MuiDrawer-paper": {
                  width: DRAWER_WIDTH,
                  maxWidth: "100%",
                  bgcolor: theme.palette.background.secondary,
                  justifyContent: "space-between",
                },
                "& .MuiPaper-root": { border: "none", pb: "1rem" },
                borderRadius: "0",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ padding: theme.spacing(2) }}
                >
                  <Box>
                    <ThemeSwitcher />
                    <IconButton onClick={() => navigate("/login")}>
                      <Icon path={mdiWalletOutline} size={1} />
                    </IconButton>
                  </Box>
                  <Box sx={{ flexGrow: 1 }} />
                  <MIconButton onClick={handleCloseSidebar}>
                    <Icon path={mdiClose} size={1} />
                  </MIconButton>
                </Stack>
                {activeNetwork && <NetworkSwitcher />}
              </Box>
              {auth && (
                <Box>
                  <LoginButton />
                </Box>
              )}
            </Drawer>
            <MIconButton onClick={handleOpenSidebar}>
              <Icon path={mdiMenu} size={1} />
            </MIconButton>
          </MHidden>
          {/* Desktop */}
          <MHidden width="smDown">
            <>
              <ThemeSwitcher />
              {activeNetwork && <NetworkSwitcher />}
              {!auth && (
                <Box
                  onClick={() => navigate("/login")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    cursor: "pointer",
                  }}
                >
                  <Icon path={mdiWalletOutline} size={1} />
                  <Typography variant="subtitle1" component="span">
                    Wallet
                  </Typography>
                </Box>
              )}
              {auth && <LoginButton />}
            </>
          </MHidden>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
