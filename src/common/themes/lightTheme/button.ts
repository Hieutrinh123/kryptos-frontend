import {
  glassGradient,
  textColorGradient,
  textColorUngradient,
} from "#/styles/gradients";
import { grey } from "#/styles/colors";
import { alpha, Components } from "@mui/material";

export const MuiButton: Components["MuiButton"] = {
  styleOverrides: {
    disableElevation: true,
    containedPrimary: {
      background: grey["200"],
      color: alpha(grey["800"], 0.25),
      boxShadow: "none !important",
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
  },
};

export const MuiIconButton: Components["MuiIconButton"] = {
  styleOverrides: {
    colorPrimary: {
      background: grey["200"],
      color: alpha(grey["800"], 0.25),
      boxShadow: "none !important",
      ":hover": {
        "& > *": {
          fill: "url(#glass-gradient)",
        },
        backgroundColor: grey["200"],
      },
      ":active": {
        background: glassGradient,
        "& > *": {
          fill: "white",
        },
      },
    },
  },
};
