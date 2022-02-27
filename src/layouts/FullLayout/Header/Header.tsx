import { Theme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import ComputerHeaderContent from "./ComputerHeaderContent";
import MobileHeaderContent from "./MobileHeaderContent";

const ResponsiveAppBar = () => {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg")
  );

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
export default ResponsiveAppBar;
