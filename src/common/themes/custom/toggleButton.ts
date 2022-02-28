import { grey } from "#/styles/colors";
import {
  glassGradient,
  textColorGradient,
  textColorUngradient,
} from "#/styles/gradients";
import { alpha } from "@mui/material/styles";
import { Components } from "@mui/material/styles/components";

export const CommonMuiToggleButton: Components["MuiToggleButton"] = {
  styleOverrides: {
    root: {
      border: "none !important",
      padding: "10px 40px",

      ":hover": {
        "& > *": textColorGradient,
      },
      "& > *": textColorUngradient,

      "&.Mui-selected": {
        background: glassGradient,
        color: "white",
        ":hover": {
          "& > *": textColorUngradient,
        },
      },
    },
  },
};

export const LightModeMuiToggleButton: Components["MuiToggleButton"] = {
  styleOverrides: {
    root: {
      background: grey["200"],
      color: grey["300"],
      ":hover": {
        background: grey["200"],
      },
    },
  },
};

export const DarkModeMuiToggleButton: Components["MuiToggleButton"] = {
  styleOverrides: {
    root: {
      background: grey["700"],
      color: alpha("#ffffff", 0.25),
      ":hover": {
        background: grey["700"],
      },
    },
  },
};
