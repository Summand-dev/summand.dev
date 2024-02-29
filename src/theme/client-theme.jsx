"use client";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useThemeStore } from "../hooks/use-theme";
import { useEffect } from "react";

// ----------------------------------------------------------------------

export default function ClientTheme({ children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDark, setDark] = useThemeStore((state) => [
    state.dark,
    state.setDark,
  ]);

  useEffect(() => {
    const isDark = localStorage.getItem("dark-mode");
    if (isDark == "false") {
      setDark(false);
    }
  }, []);

  return <></>;
}
