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
      borderRadius: 24,
      boxShadow: "none !important",
      transition: "0.5s",
    },

    containedPrimary: {
      ":hover": {
        "& > *": textColorGradient,
      },
      ":active": {
        background: glassGradient,
        "& > *": textColorUngradient,
      },
    },

    textSecondary: {
      fontWeight: "bold",
      fontSize: "1rem",
      textTransform: "unset",
      background: "transparent !important",

      ":hover": {
        "& > *": textColorGradient,
      },

      ":after": {
        content: '""',
        background: glassGradient,
        display: "block",
        borderTopLeftRadius: "6px",
        borderTopRightRadius: "6px",
        height: "6px",
        width: "0",
        position: "absolute",
        bottom: "0",
        transition: "0.5s",
      },

      "&.Mui-selected": {
        ":after": {
          width: "100%",
        },
      },
    },
  },
};

export const DarkModeMuiButton: Components["MuiButton"] = {
  styleOverrides: {
    containedPrimary: {
      background: grey["700"],
      color: "white",
      "& svg": {
        color: "white !important",
      },

      ":hover": {
        backgroundColor: grey["700"],
      },

      ":active": {
        color: "white",
      },
    },

    textSecondary: {
      color: "white",

      "& svg": {
        color: "white !important",
      },
    },
  },
};

export const LightModeMuiButton: Components["MuiButton"] = {
  styleOverrides: {
    containedPrimary: {
      background: grey["200"],
      color: alpha(grey["800"], 0.25),

      ":hover": {
        backgroundColor: grey["200"],
      },

      ":active": {
        color: "white",
      },
    },
    textSecondary: {
      color: "black",
      "& svg": {
        color: "black !important",
      },
    },
  },
};
