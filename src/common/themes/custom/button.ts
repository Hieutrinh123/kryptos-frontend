import { grey } from "#/styles/colors";
import {
  boldGlassGradient,
  glassGradient,
  textColorGradient,
  textColorUngradient,
} from "#/styles/gradients";
import { Components } from "@mui/material/styles";

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
      cursor: "pointer",
    },

    containedPrimary: {
      backgroundSize: "100%",
      backgroundImage: glassGradient,
      position: "relative",
      zIndex: 100,
      "&:before": {
        borderRadius: "inherit",
        backgroundImage: boldGlassGradient,
        content: '""',
        display: "block",
        height: "100%",
        position: "absolute",
        top: "0",
        left: "0",
        opacity: 0,
        width: "100%",
        zIndex: -100,
        transition: "opacity 500ms",
      },
      "&:hover": {
        "&:before": {
          opacity: 1,
        },
      },
    },

    containedSecondary: {
      ":hover": {
        "& > *": textColorGradient,
      },
      ":active": {
        background: glassGradient,
        "& > *": textColorUngradient,
      },
      ":hover svg": {
        fill: "url(#glass-gradient)",
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
    containedSecondary: {
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
    containedSecondary: {
      background: grey["200"],

      color: "black",
      "& svg": {
        color: "black !important",
      },

      ":hover": {
        backgroundColor: grey["200"],
      },

      ":active": {
        color: "black",
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
