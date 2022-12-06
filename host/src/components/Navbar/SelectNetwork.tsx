import React, { useEffect } from "react";
import { Box, Typography, Chip } from "@mui/material";
import { useAppSelector } from "../../hooks/reduxHooks";
// import { selectNetworkStatus } from "../../redux/slices/app-config";
import { Status } from "../../@types";
import {
  getActiveNetwork,
  selectNetworkStatus,
} from "../../redux/slices/network";

const networkStatusColor = (status: string) => {
  switch (status) {
    case "idle":
      return "#F19D38";
    case "loading":
      return "#F19D38";
    case "succeeded":
      return "#35E9AD";
    case "failed":
      return "#DD5E56";
    default:
      return "#F19D38";
  }
};

export default function SelectedNetwork() {
  const status = useAppSelector(selectNetworkStatus);
  const activeNetwork = useAppSelector(getActiveNetwork);
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
      }}
    >
      <Chip
        sx={{
          width: "8px",
          height: "8px",
          backgroundColor: networkStatusColor(status),
        }}
      />
      <Typography
        variant="subtitle1"
        component="span"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {activeNetwork?.name}
      </Typography>
    </Box>
  );
}
