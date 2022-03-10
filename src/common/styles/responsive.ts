import { Theme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

export function useIsMobile() {
  return useMediaQuery<Theme>((theme) => theme.breakpoints.down("mobile"));
}

export function useIsDesktop() {
  return useMediaQuery<Theme>((theme) => theme.breakpoints.up("desktop"));
}

export function useIsTablet() {
  return useMediaQuery<Theme>((theme) => theme.breakpoints.only("tablet"));
}
