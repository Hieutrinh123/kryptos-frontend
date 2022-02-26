import { Theme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileHeaderContent from "./MobileHeaderContent";
import ComputerHeaderContent from "./ComputerHeaderContent";

const ResponsiveAppBar = () => {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("md")
  );

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Container maxWidth="xl" sx={{ height: "100%" }}>
        <Toolbar disableGutters sx={{ height: "100%" }}>
          {isMobile ? <MobileHeaderContent /> : <ComputerHeaderContent />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
