declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: false;
    md: true;
    lg: true;
    xl: true;
    mobile: true;
    tablet: true;
    desktop: true;
  }
}

export const breakpoints = {
  values: {
    xs: 0,
    md: 600,
    lg: 1300,
    mobile: 0,
    tablet: 600,
    desktop: 1300,
    xl: 1800,
  },
};
