import { useIsMobile } from "#/styles/responsive";

export function useToolbarHeight() {
  const isMobile = useIsMobile();
  if (isMobile) {
    return 60;
  }
  return 80;
}
