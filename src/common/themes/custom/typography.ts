import { textColorGradient } from "#/styles/gradients";
import { Components } from "@mui/material/styles/components";
export const CommonMuiTypography: Components["MuiTypography"] = {
  styleOverrides: {
    subtitle2: {
      ...textColorGradient,
    },
  },
};
