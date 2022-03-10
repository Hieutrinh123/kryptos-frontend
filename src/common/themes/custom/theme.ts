import { createTheme, ThemeOptions } from "@mui/material/styles";
import _ from "lodash";
import { grey, primary } from "#/styles/colors";
import { breakpoints } from "./breakpoints";

// Add customization import (do not delete this comment)
import {
  CommonMuiMenuItem,
  DarkModeMuiMenuItem,
  LightModeMuiMenuItem,
} from "./menuItem";
import {
  CommonMuiAppBar,
  DarkModeMuiAppBar,
  LightModeMuiAppBar,
} from "./appBar";
import { CommonMuiCard, DarkModeMuiCard, LightModeMuiCard } from "./card";
import { CommonMuiLink, DarkModeMuiLink, LightModeMuiLink } from "./link";
import {
  CommonMuiInputBase,
  DarkModeMuiInputBase,
  LightModeMuiInputBase,
} from "./inputBase";
import { CommonMuiPaper, DarkModeMuiPaper, LightModeMuiPaper } from "./paper";
import {
  CommonMuiToggleButton,
  DarkModeMuiToggleButton,
  LightModeMuiToggleButton,
} from "./toggleButton";
import { CommonMuiToggleButtonGroup } from "./toggleButtonGroup";
import { CommonMuiToolbar } from "./toolbar";

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
  breakpoints,
  components: {
    // Add common component customization (do not delete this comment)
    MuiToolbar: CommonMuiToolbar,
    MuiCard: CommonMuiCard,
    MuiLink: CommonMuiLink,
    MuiInputBase: CommonMuiInputBase,
    MuiPaper: CommonMuiPaper,
    MuiMenuItem: CommonMuiMenuItem,
    MuiAppBar: CommonMuiAppBar,
    MuiButton: CommonMuiButton,
    MuiIconButton: CommonMuiIconButton,
    MuiToggleButtonGroup: CommonMuiToggleButtonGroup,
    MuiToggleButton: CommonMuiToggleButton,
  },
};

const darkModeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    background: {
      default: grey["900"],
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
    // Add dark mode component customization (do not delete this comment)
    MuiCard: DarkModeMuiCard,
    MuiLink: DarkModeMuiLink,
    MuiInputBase: DarkModeMuiInputBase,
    MuiPaper: DarkModeMuiPaper,
    MuiMenuItem: DarkModeMuiMenuItem,
    MuiAppBar: DarkModeMuiAppBar,
    MuiButton: DarkModeMuiButton,
    MuiIconButton: DarkModeMuiIconButton,
    MuiToggleButton: DarkModeMuiToggleButton,
  },
};

export const darkModeTheme = createTheme(
  _.merge(commonThemeOptions, darkModeOptions)
);

const lightModeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    background: {
      default: grey["200"],
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
    // Add light mode component customization (do not delete this comment)
    MuiCard: LightModeMuiCard,
    MuiLink: LightModeMuiLink,
    MuiInputBase: LightModeMuiInputBase,
    MuiPaper: LightModeMuiPaper,
    MuiMenuItem: LightModeMuiMenuItem,
    MuiAppBar: LightModeMuiAppBar,
    MuiIconButton: LightModeMuiIconButton,
    MuiButton: LightModeMuiButton,
    MuiToggleButton: LightModeMuiToggleButton,
  },
};

export const lightModeTheme = createTheme(
  _.merge(commonThemeOptions, lightModeOptions)
);
