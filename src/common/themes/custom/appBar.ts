import { grey } from "#/styles/colors";
import type { Components } from "@mui/material/styles/components";

export const CommonMuiAppBar: Components["MuiAppBar"] = {
  styleOverrides: {},
};

export const LightModeMuiAppBar: Components["MuiAppBar"] = {
  styleOverrides: {
    colorDefault: {
      backgroundColor: "white",
    },
  },
};

export const DarkModeMuiAppBar: Components["MuiAppBar"] = {
  styleOverrides: {
    colorDefault: {
      backgroundColor: grey["800"],
    },
  },
};
