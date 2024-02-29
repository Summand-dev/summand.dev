import { useEffect } from "react";
import { LoginView } from "../../src/sections/login";
import { Fragment } from "react";
import ThemeProvider from "../../src/theme";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { Box } from "@mui/material";
import { bgGradient } from "../../src/theme/css";
import { alpha, useTheme } from "@mui/material/styles";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

export default function Login() {
  const theme = useTheme();
  useEffect(() => {
    document.title = "Login";
  }, []);
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            display: "flex",
            alignItems: "start",
            ...bgGradient({
              color: alpha(theme.palette.background.default, 0.9),
              imgUrl: "/assets/background/overlay_4.jpg",
            }),
          }}
        >
          <LoginView></LoginView>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}

Login.Layout = Fragment;
