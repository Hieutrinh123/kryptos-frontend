import {getFullSublinkHref, NavOption, navOptions} from "#/config/navigation";
import DropdownMenu from "@/components/DropdownMenu";
import Logo from "@/components/Logo";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import {Stack} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MuiLink from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import React, {useContext} from "react";

interface NavMenuProps {
  navOption: NavOption;
}
const NavMenu: React.FC<NavMenuProps> = ({ navOption }) => {
  if (navOption.sublinks) {
    return (
      <DropdownMenu title={navOption.title} offsetX={-20} offsetY={0}>
        {navOption.sublinks.map((sublink) => (
          <MenuItem key={sublink.href}>
            <Link
              passHref
              href={getFullSublinkHref(navOption.href, sublink.href)}
            >
              <MuiLink>{sublink.title}</MuiLink>
            </Link>
          </MenuItem>
        ))}
      </DropdownMenu>
    );
  }
  return (
    <Link passHref href={"/" + navOption.href}>
      <Button variant="text" color="secondary">
        <span>{navOption.title}</span>
      </Button>
    </Link>
  );
};

const ComputerHeaderContent = () => {
  return (
    <>
      <Logo type="header" />

      <Stack flexGrow={1} direction="row" justifyContent="center" spacing={2}>
        {navOptions.map((navOption, index) => (
          <NavMenu navOption={navOption} key={index} />
        ))}
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
        <SettingMenu />
      </Box>
    </>
  );
};
export default ComputerHeaderContent;
