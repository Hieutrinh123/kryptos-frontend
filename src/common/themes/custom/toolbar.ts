import { toolbarHeight } from "#/config/toolbar";
import { Components } from "@mui/material/styles/components";

export const CommonMuiToolbar: Components["MuiToolbar"] = {
  styleOverrides: {
    root: {
      height: `${toolbarHeight}px !important`,
      minHeight: `${toolbarHeight}px !important`,
    },
  },
};
