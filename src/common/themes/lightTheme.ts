import { grey } from "./colors";
import _ from "lodash";
import commonThemeOptions from "./commonThemeOptions";
import { createTheme, ThemeOptions } from "@mui/material/styles";

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    background: {
      default: "#f5f5f5",
      paper: "#fff",
    },
    secondary: {
      main: "#fff",
    },
    text: {
      primary: grey["900"],
      secondary: grey["800"],
      disabled: grey["600"],
    },
  },
};
const lightTheme = createTheme(_.merge(commonThemeOptions, lightThemeOptions));

export default lightTheme;
