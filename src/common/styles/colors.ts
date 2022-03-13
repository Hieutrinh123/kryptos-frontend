export const primary = {
  light: "#4BC1E4",
  main: "#4795E3",
  dark: "#7F499C",
};

export const grey = {
  "900": "#141414",
  "800": "#1D1D1D",
  "850": "#181818",
  "700": "#282828",
  "600": "#353535",
  "500": "#5E5E5E",
  "400": "#8D8D8D",
  "300": "#BDBDBD",
  "200": "#F5F5F5",
  "100": "#F8F8F8",
  "50": "#FDFDFD",
};

declare module "@mui/material/styles" {
  interface TypeBackground {
    default: string;
    secondary: string;
    paper: string;
  }
}

export const lightBackground = {
  default: grey["200"],
  secondary: "#fff",
  paper: "#fff",
};

export const darkBackground = {
  default: grey["900"],
  secondary: grey["850"],
  paper: grey["600"],
};
