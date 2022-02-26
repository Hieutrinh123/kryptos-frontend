import { grey, primary } from "#/styles/colors";
import {
  CommonMuiAppBar,
  DarkModeMuiAppBar,
  LightModeMuiAppBar,
} from "#/themes/custom/appBar";
import {CommonMuiToolbar} from "#/themes/custom/toolbar";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import _ from "lodash";
import {
  CommonMuiButton,
  DarkModeMuiButton,
  LightModeMuiButton,
} from "./button";
import {
  CommonMuiIconButton,
  DarkModeMuiIconButton,
  LightModeMuiIconButton,
} from "./iconButton";

const commonThemeOptions: ThemeOptions = {
  palette: {
    primary,
    grey,
  },
  components: {
    MuiAppBar: CommonMuiAppBar,
    MuiButton: CommonMuiButton,
    MuiIconButton: CommonMuiIconButton,
    MuiToolbar: CommonMuiToolbar
  },
};

const darkModeOptions: ThemeOptions = {
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
  components: {
    MuiAppBar: DarkModeMuiAppBar,
    MuiButton: DarkModeMuiButton,
    MuiIconButton: DarkModeMuiIconButton,
  },
};

export const darkModeTheme = createTheme(
  _.merge(commonThemeOptions, darkModeOptions)
);

const lightModeOptions: ThemeOptions = {
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
    MuiAppBar: LightModeMuiAppBar,
    MuiIconButton: LightModeMuiIconButton,
    MuiButton: LightModeMuiButton,
  },
};

export const lightModeTheme = createTheme(
  _.merge(commonThemeOptions, lightModeOptions)
);
