import DropdownMenu from "#/components/DropdownMenu";
import { ThemeModeContext } from "#/themes";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { useContext } from "react";
import Logo from "./Logo";

const ComputerHeaderContent = () => {
  const { toggleTheme, mode } = useContext(ThemeModeContext);
  return (
    <>
      <Logo />

      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <DropdownMenu title={"Phân tích"} />
        <DropdownMenu title={"Phân tích"} />
        <DropdownMenu title={"Phân tích"} />
        <DropdownMenu title={"Phân tích"} />
      </Box>

      <Box
        sx={(theme) => ({
          display: "flex",
          justifyContent: "flex-end",
          gap: theme.spacing(2),
        })}
      >
        <IconButton color="primary">
          <SearchIcon />
        </IconButton>
        <Button variant="contained" color="primary">
          <span>Đăng nhập</span>
        </Button>
        <IconButton color="primary">
          <NotificationsNoneIcon />
        </IconButton>
        <DropdownMenu
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          buttonBuilder={(onClick) => (
            <IconButton color="primary" onClick={onClick}>
              <SettingsIcon />
            </IconButton>
          )}
        >
          <MenuItem>
            <Button onClick={toggleTheme}>
              Change to {mode === "light" ? "dark" : "light"} mode
            </Button>
          </MenuItem>
        </DropdownMenu>
      </Box>
    </>
  );
};
export default ComputerHeaderContent;
