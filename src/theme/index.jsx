import { useMemo } from "react";
import PropTypes from "prop-types";

import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import ClientTheme from "@/src/theme/client-theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { palette } from "./palette";
import { shadows } from "./shadows";
import { overrides } from "./overrides";
import { typography } from "./typography";
import { customShadows } from "./custom-shadows";
import { useThemeStore } from "../hooks/use-theme";

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
  const [isDark, setDark] = useThemeStore((state) => [
    state.dark,
    state.setDark,
  ]);

  const memoizedValue = useMemo(
    () => ({
      palette: palette(isDark ? "dark" : "light"),
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    [isDark]
  );

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <ClientTheme />
      {children}
    </MUIThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
