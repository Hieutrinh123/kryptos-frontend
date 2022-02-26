import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Logo from "./Logo";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";

const pages = ["Products", "Pricing", "Blog"];

const ComputerHeaderContent = () => {
  return (
    <>
      <Logo />

      <Box sx={{ flexGrow: 1, display: "flex" }}>
        {pages.map((page) => (
          <Button key={page} sx={{ my: 2, display: "block" }}>
            {page}
          </Button>
        ))}
      </Box>

      <Box
        sx={(theme) => ({
          flexGrow: 1,
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
        <IconButton color="primary">
          <SettingsIcon />
        </IconButton>
      </Box>
    </>
  );
};
export default ComputerHeaderContent;
