import React, { useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import ThemeProvider from "../src/theme";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";

const cacheRtl = createCache({
  key: "muirtl",
  // stylisPlugins: [rtlPlugin],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider>
        {/* <div dir="rtl"> */}
        {/* <LocalizationProvider dateAdapter={AdapterDateFnsJalali}> */}
        <Component {...pageProps} />
        {/* </LocalizationProvider> */}
        {/* </div> */}
      </ThemeProvider>
    </CacheProvider>
  );
}
