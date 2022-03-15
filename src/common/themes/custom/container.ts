import { Theme } from "@mui/material/styles";
import { Components } from "@mui/material/styles/components";

export const CommonMuiContainer: Components["MuiContainer"] = {
  styleOverrides: {
    root: ({ ownerState, theme }) => {
      const t = theme as Theme;
      if (!ownerState.disableGutters) {
        return {
          [t.breakpoints.down("desktop")]: {
            paddingLeft: t.spacing(6),
            paddingRight: t.spacing(6),
          },
          [t.breakpoints.down("tablet")]: {
            paddingLeft: t.spacing(4),
            paddingRight: t.spacing(4),
          },
        };
      }
    },
  },
};
export const LightModeMuiContainer: Components["MuiContainer"] = {
  styleOverrides: {},
};
export const DarkModeMuiContainer: Components["MuiContainer"] = {
  styleOverrides: {},
};
