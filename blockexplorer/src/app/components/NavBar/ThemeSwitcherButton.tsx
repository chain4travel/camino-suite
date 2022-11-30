import React, { useContext, useEffect } from "react";
import { Button } from "@mui/material";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useTheme } from "@mui/material";
import { ColorModeContext } from "../../../styles/theme/ThemeProvider";

export default function ThemeSwitcherButton() {
  const theme = useTheme();
  const themeContext = useContext(ColorModeContext);
  const themeMode = theme.palette.mode === "light" ? true : false;
  return (
    <Button
      sx={{ p: "0px", minWidth: "36px" }}
      disableRipple
      onClick={() => {
        if (themeContext.toggleColorMode) {
          themeContext?.toggleColorMode();
        }
      }}
      aria-label="theme mode"
    >
      {themeMode ? (
        <DarkModeOutlinedIcon sx={{ color: "primary.contrastText" }} />
      ) : (
        <WbSunnyOutlinedIcon sx={{ color: "primary.contrastText" }} />
      )}
    </Button>
  );
}
