import { grey } from "#/styles/colors";
import { Components } from "@mui/material/styles/components";

export const CommonMuiPaper: Components["MuiPaper"] = {
  styleOverrides: {
    root: {
      borderRadius: "12px",
    },
  },
  defaultProps: {},
};

export const LightModeMuiPaper: Components["MuiPaper"] = {
  styleOverrides: {
    root: {
      background: "white",
    },
  },
};

export const DarkModeMuiPaper: Components["MuiPaper"] = {
  styleOverrides: {
    root: {
      background: grey["800"],
    },
  },
};
