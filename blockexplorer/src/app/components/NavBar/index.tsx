import * as React from "react";
import { Link } from "react-router-dom";
import { Box, Container, AppBar, Toolbar, useTheme } from "@mui/material";
import Logo from "./Logo";
import SearchInput from "./SearchInput";
import ThemeSwitcherButton from "./ThemeSwitcherButton";
import NetworkSelect from "./NetworkSelect";
import Links from "./Links";
import Drawer from "./Drawer";
import useWidth from "app/hooks/useWidth";

export function NavBar() {
  const theme = useTheme();
  const { isDesktop } = useWidth();

  return (
    <Container
      maxWidth="xl"
      sx={{
        width: "100%",
        paddingLeft: "0px !important",
        paddingRight: "0px !important",
        marginBottom: "0px",
        marginTop: "0px",
        gap: "0px",
        "@media (max-width: 899px)": {
          marginTop: "0px",
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          height: "auto",
          backgroundColor: "card.navBar",
          p: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          minHeight: "auto",
          [theme.breakpoints.down("md")]: {
            padding: "1rem 0.5rem",
          },
        }}
      >
        <Box sx={{ display: "flex" }}>{isDesktop && <Links />}</Box>
        <Box sx={{ display: "flex", marginLeft: !isDesktop ? "auto" : "0" }}>
          <SearchInput />
        </Box>
      </Toolbar>
    </Container>
  );
}
