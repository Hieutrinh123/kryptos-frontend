import { grey } from "#/styles/colors";
import {
  glassGradient,
  textColorGradient,
  textColorUngradient,
} from "#/styles/gradients";
import { alpha, Components } from "@mui/material/styles";

export const CommonMuiButton: Components["MuiButton"] = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    disableElevation: true,
    root: {
      borderRadius: 50,
      boxShadow: "none !important",
    },

    textSecondary: {
      fontWeight: "bold",
      fontSize: "1.2rem",
      textTransform: "unset",
    },
  },
};

export const DarkModeMuiButton: Components["MuiButton"] = {
  styleOverrides: {
    containedPrimary: {
      background: grey["700"],
      color: "white",
      ":hover": {
        "& > *": textColorGradient,
        background: grey["700"],
      },
      ":active": {
        background: glassGradient,
        "& > *": textColorUngradient,
        color: "white",
      },
    },
    textSecondary: {
      color: "white",
    },
  },
};


export const LightModeMuiButton: Components["MuiButton"] = {
  styleOverrides: {
    containedPrimary: {
      background: grey["200"],
      color: alpha(grey["800"], 0.25),
      ":hover": {
        "& > *": textColorGradient,
        backgroundColor: grey["200"],
      },
      ":active": {
        background: glassGradient,
        "& > *": textColorUngradient,
        color: "white",
      },
    },
    textSecondary: {
      color: "black",
    },
  },
};

