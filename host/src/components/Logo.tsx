import React, { useEffect } from "react";
import { useState } from "react";
import { Box, MenuItem, Select, useTheme, Typography } from "@mui/material";
import { mdiChevronRight } from "@mdi/js";
import { APPS_CONSTS } from "../constants/apps-consts";
import useWidth from "../hooks/useWidth";
import Icon from "@mdi/react";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../hooks/reduxHooks";
import { changeActiveApp } from "../redux/slices/app-config";
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const theme = useTheme();
  const navigate = useNavigate();
  const themeMode = theme.palette.mode === "light" ? true : false;
  const { isDesktop } = useWidth();
  const [app, setApp] = useState("Explorer");
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        // borderRight: `1px solid ${theme.palette.divider}`,
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        pr: "1rem",
        [theme.breakpoints.down("sm")]: { pr: ".5rem" },
      }}
    >
      <Select
        value={app}
        onChange={(e) => {
          setApp(e.target.value);
          dispatch(changeActiveApp(e.target.value));
        }}
        sx={{
          minWidth: "auto",
          pl: "0rem !important",
          border: "none",
          ".MuiOutlinedInput-input": { pr: "42px !important" },
          ".MuiSelect-select": { pl: "0rem" },
          ".MuiOutlinedInput-notchedOutline": { border: "none" },
          ".MuiSvgIcon-root": {
            color: theme.palette.text.primary,
            fontSize: "2rem",
          },
        }}
        renderValue={() => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={
                !isDesktop
                  ? "./assets/CaminoLogo.svg"
                  : themeMode
                  ? "./assets/LightModeLogo.svg"
                  : "./assets/DarkModeLogo.svg"
              }
              alt="Camino Logo"
              style={
                !isDesktop
                  ? { width: "30px", height: "30px" }
                  : { width: "120px", height: "34px" }
              }
            />
            <Typography
              variant="h4"
              component="span"
              fontWeight="300"
              sx={{ ml: ".5rem", color: "#149EED" }}
            >
              {app}
            </Typography>
          </Box>
        )}
      >
        {APPS_CONSTS.map((app, index) => (
          <MenuItem
            key={index}
            value={app.name}
            divider
            onClick={() => navigate(app.url)}
          >
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h5"
                  component="span"
                  noWrap
                  fontWeight="300"
                  sx={{ color: "#149EED" }}
                >
                  {app.name}
                </Typography>
                <Icon path={mdiChevronRight} size={0.9} />
              </Box>
              <Typography variant="subtitle2" component="span" fontWeight="300">
                {app.subText}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
