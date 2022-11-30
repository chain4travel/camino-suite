import React from "react";
import { AppBar, Box } from "@mui/material";
import { Toolbar } from "@mui/material";
import Logo from "../Logo";
import NetworkSwitcher from "./NetworkSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
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
          <NetworkSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
