import { categories, Category, getSubcategoryHref } from "#/config/navigation";
import DropdownMenu from "@/components/DropdownMenu";
import Logo from "@/components/Logo/Logo";
import SettingMenu from "@/containers/SettingMenu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import { Popover, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MuiLink from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import React, { useState } from "react";
import Notification from "../Notification";

interface NavMenuProps {
  category: Category;
}
const NavMenu: React.FC<NavMenuProps> = ({ category }) => {
  if (category.subcategories) {
    return (
      <DropdownMenu title={category.title} offsetX={-20} offsetY={0}>
        {category.subcategories.map((subcategory) => (
          <MenuItem key={subcategory.slug}>
            <Link
              passHref
              href={getSubcategoryHref(category.slug, subcategory.slug)}
            >
              <MuiLink>{subcategory.title}</MuiLink>
            </Link>
          </MenuItem>
        ))}
      </DropdownMenu>
    );
  }
  return (
    <Link passHref href={"/" + category.slug}>
      <Button variant="text" color="secondary">
        <span>{category.title}</span>
      </Button>
    </Link>
  );
};

const DesktopHeaderContent = () => {
  const [anchorEl, setAnchorEl] = useState();

  const onClickNotificationIcon = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseNotificationPopover = () => {
    setAnchorEl(undefined);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Logo type="header" />

      <Stack flexGrow={1} direction="row" justifyContent="center" spacing={2}>
        {categories.map((category, index) => (
          <NavMenu category={category} key={index} />
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
        <IconButton
          color="primary"
          onClick={onClickNotificationIcon}
          aria-describedby={id}
        >
          <NotificationsNoneIcon />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={onCloseNotificationPopover}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          className="notification__container"
        >
          <Notification />
        </Popover>
        <SettingMenu />
      </Box>
    </>
  );
};
export default DesktopHeaderContent;
