import { Theme } from "@mui/material/styles";

export default function MenuList(theme: Theme) {
  return {
    MuiList: {
      styleOverrides: {
        root: {
          display: "grid",
          padding: 0,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadiusMd,
          backgroundColor: theme.palette.background.paper,
          boxShadow: "none",
          maxWidth: "350px",
          "& .MuiMenuItem-root": {
            padding: ".8rem",
            "&.Mui-selected": {
              backgroundColor: `${theme.palette.action.selected} !important`,
            },
            "&:hover": { backgroundColor: theme.palette.action.hover },
          },
        },
      },
    },
  };
}
