import { selectClasses } from "@mui/material/Select";
import { Components } from "@mui/material/styles/components";

export const CommonMuiInputBase: Components["MuiInputBase"] = {
  styleOverrides: {
    root: {
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
