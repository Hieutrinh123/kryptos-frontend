import { grey } from "#/styles/colors";
import { boldGlassGradient, glassGradient } from "#/styles/gradients";
import { Components } from "@mui/material/styles";

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
      backgroundSize: "100%",
      backgroundImage: glassGradient,
      position: "relative",
      zIndex: 100,
      "&:before": {
        borderRadius: 24,
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
      "& svg": {
        fill: "white",
      },
      "&:active,&.Mui-selected": {
        background: boldGlassGradient,
        "& svg": {
          fill: "white",
        },
      },
    },
    colorSecondary: {
      ":hover svg": {
        fill: "url(#glass-gradient)",
      },
      "&:active,&.Mui-selected": {
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
    colorSecondary: {
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
    colorSecondary: {
      background: grey["200"],
      color: "black",
      ":hover": {
        backgroundColor: grey["200"],
      },
    },
  },
};
