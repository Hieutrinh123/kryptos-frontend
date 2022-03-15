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
  styleOverrides: {},
};

export const DarkModeMuiLink: Components["MuiLink"] = {
  styleOverrides: {},
};
