import { Theme } from "@mui/material/styles";

export default function Toolbar(theme: Theme) {
  return {
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.paper,
          minHeight: "64px",
          [theme.breakpoints.down("sm")]: {
            minHeight: "54px",
            paddingLeft: ".5rem",
            paddingRight: ".5rem",
          },
        },
      },
    },
  };
}
