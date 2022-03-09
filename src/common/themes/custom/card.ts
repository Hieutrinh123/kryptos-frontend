import { grey } from "#/styles/colors";
import { Components } from "@mui/material/styles/components";
export const CommonMuiCard: Components["MuiCard"] = {
  styleOverrides: {
    root: {
      borderRadius: "24px",
    },
  },
  defaultProps: {
    elevation: 0,
  },
};
export const LightModeMuiCard: Components["MuiCard"] = {
  styleOverrides: {
    root: {
      backgroundColor: "#fff",
    },
  },
};
export const DarkModeMuiCard: Components["MuiCard"] = {
  styleOverrides: {
    root: {
      backgroundColor: grey["800"],
    },
  },
};
