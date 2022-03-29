import { Components } from "@mui/material/styles/components";
export const CommonMuiFilledInput: Components["MuiFilledInput"] = {
  styleOverrides: {
    root: {
      borderBottom: "none",
      borderRadius: 12,
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
