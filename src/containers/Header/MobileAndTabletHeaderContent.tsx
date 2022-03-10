import { ThemeModeContext } from "#/themes";
import Logo from "@/components/Logo/Logo";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { SyntheticEvent, useContext, useState } from "react";

const pages = ["Products", "Pricing", "Blog"];

const MobileAndTabletHeaderContent = () => {
  const [anchorElNav, setAnchorElNav] = useState<Element | null>(null);

  const { toggleTheme, theme } = useContext(ThemeModeContext);

  const handleOpenNavMenu = (event: SyntheticEvent) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Logo type="header" />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "row-reverse",
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
        >
          {pages.map((page) => (
            <MenuItem key={page} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">{page}</Typography>
            </MenuItem>
          ))}

          <MenuItem onClick={toggleTheme}>
            <Typography textAlign="center">
              Change to {theme === "light" ? "dark" : "light"} mode
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};
export default MobileAndTabletHeaderContent;
