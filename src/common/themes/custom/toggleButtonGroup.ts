import { toggleButtonClasses } from "@mui/material";
import { Components } from "@mui/material/styles/components";

export const CommonMuiToggleButtonGroup: Components["MuiToggleButtonGroup"] = {
  styleOverrides: {
    root: {
      [`& .${toggleButtonClasses.root}:first-child`]: {
        borderRadius: "24px 0 0 24px",
      },
      [`& .${toggleButtonClasses.root}:last-child`]: {
        borderRadius: "0 24px 24px 0",
      },
    },
  },
};
