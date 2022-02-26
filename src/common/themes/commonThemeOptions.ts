import { grey, primary } from "#/styles/colors";
import { ThemeOptions } from "@mui/material/styles";

const commonThemeOptions: ThemeOptions = {
  palette: {
    primary,
    grey,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
        },
      },
    },
  },
};

export default commonThemeOptions;
