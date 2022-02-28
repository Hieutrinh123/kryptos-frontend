import { selectClasses } from "@mui/material";
import { Components } from "@mui/material/styles/components";

export const CommonMuiInputBase: Components["MuiInputBase"] = {
  styleOverrides: {
    root: {
      borderRadius: "50px !important",
      [`& > .${selectClasses.select}`]: {
        textAlign: "center",
      },
    },
  },
};

export const LightModeMuiInputBase: Components["MuiInputBase"] = {
  styleOverrides: {},
};

export const DarkModeMuiInputBase: Components["MuiInputBase"] = {
  styleOverrides: {},
};
