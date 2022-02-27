import { textColorGradient, textColorUngradient } from "#/styles/gradients";
import { Components } from "@mui/material/styles/components";

export const CommonMuiMenuItem: Components["MuiMenuItem"] = {
  styleOverrides: {
    root: {
      padding: "10px 40px 10px 20px",
      ":hover": {
        background: "unset",
        "& > a": textColorGradient,
      },
      "& > a": {
        ...textColorUngradient,
        textDecoration: "none",
      },
    },
  },
};

export const LightModeMuiMenuItem: Components["MuiMenuItem"] = {
  styleOverrides: {},
};

export const DarkModeMuiMenuItem: Components["MuiMenuItem"] = {
  styleOverrides: {},
};
