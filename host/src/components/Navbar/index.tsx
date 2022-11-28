import React from "react";
import { AppBar, Box } from "@mui/material";
import { Toolbar } from "@mui/material";
import Logo from "../Logo";
import NetworkSwitcher from "./NetworkSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
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
