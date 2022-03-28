import { CATEGORIES } from "#/config/navigation";
import DropdownMenu from "@/components/DropdownMenu";
import Logo from "@/components/Logo/Logo";
import AuthenticationMenu from "@/containers/AuthenticationMenu";
import AuthenticationButton from "@/containers/Header/DesktopHeaderContent/AuthenticationButton";
import NavMenu from "@/containers/Header/DesktopHeaderContent/DesktopNavMenu";
import SettingsMenu from "@/containers/SettingMenu";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import React from "react";

const DesktopHeaderContent = () => {
  return (
    <>
      <Logo />

      <Stack flexGrow={1} direction="row" justifyContent="center" spacing={2}>
        {CATEGORIES.map((category, index) => (
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

        <DropdownMenu
          buttonBuilder={(buttonProps) => (
            <AuthenticationButton {...buttonProps} />
          )}
          offsetY={20}
          offsetX={-50}
        >
          <AuthenticationMenu width={300} />
        </DropdownMenu>

        <DropdownMenu
          buttonBuilder={(buttonProps) => (
            <IconButton color="primary" {...buttonProps}>
              <SettingsIcon />
            </IconButton>
          )}
          offsetY={20}
        >
          <SettingsMenu />
        </DropdownMenu>
      </Box>
    </>
  );
};
export default DesktopHeaderContent;
