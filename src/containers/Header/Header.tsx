import {useIsMobile} from "#/styles/responsive";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import ComputerHeaderContent from "./ComputerHeaderContent";
import MobileHeaderContent from "./MobileHeaderContent";

const Header = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <AppBar position="fixed" color="default" elevation={0}>
        <Container maxWidth={false} sx={{ height: "100%" }}>
          <Toolbar disableGutters sx={{ height: "100%" }}>
            {isMobile ? <MobileHeaderContent /> : <ComputerHeaderContent />}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};
export default Header;
