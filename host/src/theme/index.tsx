import React from "react";
import { useMemo, ReactNode } from "react";
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeOptions,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import shape from "./shape";
import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
import componentsOverrides from "./overrides";
import { useAppSelector } from "../hooks/reduxHooks";
import { getTheme } from "../redux/slices/theme";
import "./fonts.css";
import shadow, { customShadows } from "./shadows";

type ThemeConfigProps = {
  children: ReactNode;
};

export default function ThemeConfig({ children }: ThemeConfigProps) {
  const mode = useAppSelector(getTheme);
  const isLight = mode === "light";

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: isLight
        ? { ...palette.light, mode: "light" }
        : { ...palette.dark, mode: "dark" },
      shadow,
      shape,
      typography,
      breakpoints,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverrides(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
