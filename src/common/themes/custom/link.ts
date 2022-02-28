import { textColorGradient } from "#/styles/gradients";
import { Components } from "@mui/material/styles/components";

export const CommonMuiLink: Components["MuiLink"] = {
  styleOverrides: {
    root: {
      ":hover": {
        ...textColorGradient,
      },
    },
  },
};

export const LightModeMuiLink: Components["MuiLink"] = {
  styleOverrides: {
    root: {
      color: "black",
    },
  },
};

export const DarkModeMuiLink: Components["MuiLink"] = {
  styleOverrides: {
    root: {
      color: "white",
    },
  },
};
