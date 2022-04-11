import { Components } from "@mui/material/styles/components";
export const CommonMuiFilledInput: Components["MuiFilledInput"] = {
  styleOverrides: {
    root: {
      borderRadius: "12px",
      overflow: "hidden",
    },
  },
  defaultProps: {
    disableUnderline: true,
  },
};
export const LightModeMuiFilledInput: Components["MuiFilledInput"] = {
  styleOverrides: {},
};
export const DarkModeMuiFilledInput: Components["MuiFilledInput"] = {
  styleOverrides: {},
};
