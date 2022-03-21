import { categories, Category } from "#/config/navigation";
import DropdownMenu from "@/components/DropdownMenu";
import Logo from "@/components/Logo/Logo";
import AuthenticationMenu from "@/containers/AuthenticationMenu";
import SettingMenu from "@/containers/SettingMenu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import { Popover, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MuiLink from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import { usePopupState } from "material-ui-popup-state/hooks";
import Link from "next/link";
import React, { useState } from "react";
import Notification from "../Notification";

interface NavMenuProps {
  category: Category;
}
const NavMenu: React.FC<NavMenuProps> = ({ category }) => {
  const popupState = usePopupState({
    popupId: "nav-menu-" + category.slug,
    variant: "popover",
  });

  if (category.subcategories) {
    return (
      <DropdownMenu
        popupState={popupState}
        title={category.title}
        offsetX={-20}
        offsetY={0}
      >
        {category.subcategories.map((subcategory) => (
          <Link
            passHref
            href={"/categories/" + subcategory.slug}
            key={subcategory.slug}
          >
            <a onClick={popupState.close}>
              <MenuItem>
                <MuiLink>{subcategory.title}</MuiLink>
              </MenuItem>
            </a>
          </Link>
        ))}
      </DropdownMenu>
    );
  }
  return (
    <Link passHref href={"/categories/" + category.slug}>
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
      <Logo />

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
        <AuthenticationMenu />
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
