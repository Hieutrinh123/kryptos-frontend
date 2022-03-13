import { createTheme, ThemeOptions } from "@mui/material/styles";
import _ from "lodash";
import {
  darkBackground,
  grey,
  lightBackground,
  primary,
} from "#/styles/colors";
import { breakpoints } from "./breakpoints";

// Add customization import (do not delete this comment)
import {
  CommonMuiCardContent,
  DarkModeMuiCardContent,
  LightModeMuiCardContent,
} from "./cardContent";
import {
  CommonMuiCardMedia,
  DarkModeMuiCardMedia,
  LightModeMuiCardMedia,
} from "./cardMedia";
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
  typography: (palette) => ({
    allVariants: {
      color: palette.text.primary,
    },
  }),
  breakpoints,
  components: {
    // Add common component customization (do not delete this comment)
    MuiCardContent: CommonMuiCardContent,
    MuiCardMedia: CommonMuiCardMedia,
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
    background: darkBackground,

    secondary: {
      main: grey["800"],
    },
    text: {
      primary: "#fff",
      secondary: "#f0f0f0",
      disabled: "#5e5e5e",
    },
  },

  components: {
    // Add dark mode component customization (do not delete this comment)
    MuiCardContent: DarkModeMuiCardContent,
    MuiCardMedia: DarkModeMuiCardMedia,
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
    background: lightBackground,
    secondary: {
      main: grey["500"],
    },
    text: {
      primary: grey["900"],
      secondary: grey["800"],
      disabled: grey["300"],
    },
  },
  components: {
    // Add light mode component customization (do not delete this comment)
    MuiCardContent: LightModeMuiCardContent,
    MuiCardMedia: LightModeMuiCardMedia,
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
