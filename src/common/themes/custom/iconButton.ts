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
    colorPrimary: {
      ":hover svg": {
        fill: "url(#glass-gradient)",
      },
      ":active": {
        background: glassGradient,
        "& svg": {
          fill: "white",
        },
      },
    },
  },
};

export const DarkModeMuiIconButton: Components["MuiIconButton"] = {
  styleOverrides: {
    colorPrimary: {
      background: grey["700"],
      color: "white",
      ":hover": {
        backgroundColor: grey["700"],
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
        backgroundColor: grey["200"],
      },
    },
  },
};
