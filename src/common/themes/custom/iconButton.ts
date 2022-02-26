import { grey } from "#/styles/colors";
import { glassGradient } from "#/styles/gradients";
import { alpha, Components } from "@mui/material/styles";

export const CommonMuiIconButton: Components["MuiIconButton"] = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: {
      borderRadius: 50,
      boxShadow: "none !important",
    },
  },
};

export const DarkModeMuiIconButton: Components["MuiIconButton"] = {
  styleOverrides: {
    colorPrimary: {
      background: grey["700"],
      color: "white",
      ":hover": {
        "& > *": {
          fill: "url(#glass-gradient)",
        },
        backgroundColor: grey["700"],
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

export const LightModeMuiIconButton: Components["MuiIconButton"] = {
  styleOverrides: {
    colorPrimary: {
      background: grey["200"],
      color: alpha(grey["800"], 0.25),
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
