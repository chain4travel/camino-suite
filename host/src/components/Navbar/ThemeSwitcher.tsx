import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { toggleTheme } from "../../redux/slices/theme";
import { Button, Typography, useTheme } from "@mui/material";
import { mdiWeatherSunny } from "@mdi/js";
import Icon from "@mdi/react";
import useWidth from "../../hooks/useWidth";
import { useStore } from "Explorer/useStore";
import { getTheme } from "../../redux/slices/theme";

export default function ThemeSwitcher() {
  const { isDesktop } = useWidth();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const currentTheme = useAppSelector(getTheme);
  const { changeTheme } = useStore();
  useEffect(() => {
    console.log(currentTheme);
  }, [currentTheme]);
  return (
    <Button
      variant="text"
      onClick={() => {
        changeTheme(currentTheme === "light" ? "dark" : "light");
        dispatch(toggleTheme());
      }}
      startIcon={<Icon path={mdiWeatherSunny} size={1} />}
      disableRipple
      sx={{
        minWidth: "auto",
        "&:hover": { backgroundColor: "transparent" },
        ".MuiButton-startIcon": { mr: isDesktop ? "0.5rem" : "0rem" },
      }}
    >
      {isDesktop && (
        <Typography variant="subtitle1">{theme.palette.mode}</Typography>
      )}
    </Button>
  );
}
