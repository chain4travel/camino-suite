import { Theme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Select(theme: Theme) {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: ExpandMoreIcon,
      },
      styleOverrides: {
        select: {
          padding: "1rem",
          paddingLeft: ".5rem",
          "& + .MuiSvgIcon-root": { color: theme.palette.primary.light },
        },
      },
    },
  };
}
