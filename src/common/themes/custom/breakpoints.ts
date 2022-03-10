declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: false;
    md: true;
    lg: true;
    xl: false;
    mobile: true;
    tablet: true;
    desktop: true;
  }
}

export const breakpoints = {
  values: {
    xs: 0,
    md: 900,
    lg: 1200,
    mobile: 0,
    tablet: 900,
    desktop: 1200,
  },
};
