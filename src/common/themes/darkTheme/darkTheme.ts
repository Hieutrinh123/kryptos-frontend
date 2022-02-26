import { ThemeOptions, createTheme } from "@mui/material/styles";
import _ from "lodash";
import commonThemeOptions from "#/themes/commonThemeOptions";
import { grey } from "#/styles/colors";

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    background: {
      default: grey["800"],
      paper: grey["600"],
    },
    secondary: {
      main: grey["800"]!,
    },
    text: {
      primary: "#fff",
      secondary: "#f0f0f0",
      disabled: "#d0d0d0",
    },
  },
  components: {},
};

const darkTheme = createTheme(_.merge(commonThemeOptions, darkThemeOptions));

export default darkTheme;
