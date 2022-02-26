import { PaletteMode, ThemeProvider } from "@mui/material";
import React, { useMemo, useState } from "react";
import darkTheme from "./darkTheme";
import lightTheme from "./lightTheme";

interface ThemeContextProps {
  mode: PaletteMode;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  mode: "light",
  toggleTheme: () => {},
});

export const ThemeModeProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>("light");

  const theme = useMemo(() => {
    return mode === "light" ? lightTheme : darkTheme;
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
