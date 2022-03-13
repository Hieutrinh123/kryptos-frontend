import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function useIsMobile() {
  return useMediaQuery<Theme>((theme) => theme.breakpoints.down("tablet"));
}

export function useIsTablet() {
  return useMediaQuery<Theme>((theme) => theme.breakpoints.only("tablet"));
}

export function useIsDesktop() {
  return useMediaQuery<Theme>((theme) => theme.breakpoints.up("desktop"));
}
