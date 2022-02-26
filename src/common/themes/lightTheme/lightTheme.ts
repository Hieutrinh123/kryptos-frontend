import { MuiButton, MuiIconButton } from "./button";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import _ from "lodash";
import { grey } from "#/styles/colors";
import commonThemeOptions from "../commonThemeOptions";

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    background: {
      default: "#fff",
      paper: "#fff",
    },
    secondary: {
      main: grey["500"]!,
    },
    text: {
      primary: grey["900"],
      secondary: grey["800"],
      disabled: grey["600"],
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiIconButton,
    MuiButton,
  },
};
const lightTheme = createTheme(_.merge(commonThemeOptions, lightThemeOptions));

export default lightTheme;
