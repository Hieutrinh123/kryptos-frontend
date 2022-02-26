import DropdownMenu from "#/components/DropdownMenu";
import { ThemeModeContext } from "#/themes";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useContext } from "react";
import Logo from "./Logo";

const ComputerHeaderContent = () => {
  const { toggleTheme, mode } = useContext(ThemeModeContext);
  return (
    <>
      <Logo />

      <Stack flexGrow={1} direction="row" justifyContent="center" spacing={2}>
        <Link href="/project-analysis" passHref>
          <Button variant="text" color="secondary">
            Phân tích dự án
          </Button>
        </Link>
        <DropdownMenu title="Phân tích">
          <MenuItem>Phân tích On-Chain</MenuItem>
          <MenuItem>Phân tích kỹ thuật</MenuItem>
        </DropdownMenu>
        <DropdownMenu title={"Phân tích"} />
        <DropdownMenu title={"Phân tích"} />
      </Stack>

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
          placement="bottom-start"
          buttonBuilder={(buttonProps) => (
            <IconButton color="primary" {...buttonProps}>
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
