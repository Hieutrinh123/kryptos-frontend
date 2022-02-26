import { PaletteMode, ThemeProvider } from "@mui/material";
import React, { useMemo, useState } from "react";
import { darkModeTheme, lightModeTheme } from "./custom/theme";

interface ThemeContextProps {
  mode: PaletteMode;
  toggleTheme: () => void;
}

export const ThemeModeContext = React.createContext<ThemeContextProps>({
  mode: "dark",
  toggleTheme: () => {},
});

export const ThemeModeProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>("dark");

  const theme = useMemo(() => {
    return mode === "light" ? lightModeTheme : darkModeTheme;
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
