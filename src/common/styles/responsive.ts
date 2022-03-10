import { Theme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

export const mobileBreakpoint = "md";

export function useIsMobile() {
  return useMediaQuery<Theme>(mobileBreakpointQuery);
}

export function mobileBreakpointQuery(theme: Theme) {
  return theme.breakpoints.down(mobileBreakpoint);
}

interface ResponsivePropsInput {
  mobile: any;
  desktop?: any;
}

export function responsiveProps({ mobile, desktop }: ResponsivePropsInput) {
  return {
    xs: mobile,
    md: desktop,
  };
}
