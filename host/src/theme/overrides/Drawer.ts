import { Theme } from "@mui/material";

export default function Drawer(theme: Theme) {
  return {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: theme.shape.borderRadiusNone,
        },
      },
    },
  };
}
