import type { PaletteMode } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React, { useCallback } from "react";
import { useDarkMode } from "usehooks-ts";
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
  const { isDarkMode, toggle, enable, disable } = useDarkMode(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const changeTheme = useCallback(
    (mode: PaletteMode) => {
      if (mode === "light") {
        disable();
      } else {
        enable();
      }
    },
    [enable, disable]
  );

  const body = (
    <ThemeModeContext.Provider
      value={{
        theme: isDarkMode ? "dark" : "light",
        toggleTheme: toggle,
        changeTheme,
      }}
    >
      <ThemeProvider theme={isDarkMode ? darkModeTheme : lightModeTheme}>
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{body}</div>;
  }
  return body;
};
