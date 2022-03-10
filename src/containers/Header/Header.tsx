import { useIsDesktop } from "#/styles/responsive";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import DesktopHeaderContent from "./DesktopHeaderContent";
import MobileAndTabletHeaderContent from "./MobileAndTabletHeaderContent";

const Header = () => {
  const isDesktop = useIsDesktop();

  return (
    <>
      <AppBar position="fixed" color="default" elevation={0}>
        <Container maxWidth={false} sx={{ height: "100%" }}>
          <Toolbar disableGutters sx={{ height: "100%" }}>
            {isDesktop ? (
              <DesktopHeaderContent />
            ) : (
              <MobileAndTabletHeaderContent />
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};
export default Header;
