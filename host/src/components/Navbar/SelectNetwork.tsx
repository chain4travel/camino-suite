import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectNetworkStatus } from "../../redux/slices/app-config";

interface ISelectNetworkProps {
  value: string | undefined;
}

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

export default function SelectedNetwork({ value }: ISelectNetworkProps) {
  const status = useAppSelector(selectNetworkStatus);

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
        {value}
      </Typography>
    </Box>
  );
}
