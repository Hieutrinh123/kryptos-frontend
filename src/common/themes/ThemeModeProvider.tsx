import type { PaletteMode } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React, { useMemo, useState } from "react";
import { darkModeTheme, lightModeTheme } from "./custom/theme";

interface ThemeContextProps {
  theme: PaletteMode;
  toggleTheme: () => void;
  changeTheme: (mode: PaletteMode) => void;
}

export const ThemeModeContext = React.createContext<ThemeContextProps>({
  theme: "dark",
  toggleTheme: () => {},
  changeTheme: () => {},
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
    <ThemeModeContext.Provider
      value={{ theme: mode, toggleTheme, changeTheme: setMode }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
