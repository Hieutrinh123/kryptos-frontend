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
    md: 600,
    lg: 1120,
    mobile: 0,
    tablet: 600,
    desktop: 1120,
  },
};
