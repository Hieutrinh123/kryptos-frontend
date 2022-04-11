import { useToolbarHeight } from "#/config/toolbar";
import { useIsDesktop } from "#/styles/responsive";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import DesktopHeaderContent from "./DesktopHeaderContent/DesktopHeaderContent";
import MobileAndTabletHeaderContent from "./MobileHeaderContent/MobileAndTabletHeaderContent";

const Header = () => {
  const isDesktop = useIsDesktop();
  const toolbarHeight = useToolbarHeight();

  return (
    <Box>
      <AppBar position="fixed" color="default" elevation={0}>
        <Container maxWidth={false} sx={{ height: "100%", paddingX: 4 }}>
          <Toolbar disableGutters sx={{ height: toolbarHeight }}>
            {isDesktop ? (
              <DesktopHeaderContent />
            ) : (
              <MobileAndTabletHeaderContent />
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar disableGutters sx={{ height: toolbarHeight }} />
    </Box>
  );
};
export default Header;
