import { HEADER_NAVIGATIONS, OVERVIEW_NAVIGATION } from "#/config/navigation";
import DropdownMenu from "@/components/DropdownMenu";
import Logo from "@/components/Logo/Logo";
import AuthenticationMenu from "@/containers/AuthenticationMenu";
import AuthenticationButton from "@/containers/Header/DesktopHeaderContent/AuthenticationButton";
import NavMenu from "@/containers/Header/DesktopHeaderContent/DesktopNavMenu";
import NotificationMenu from "@/containers/NotificationMenu";
import SettingsMenu from "@/containers/SettingMenu";
import { useFirebaseAuthState } from "@/firebase/auth/useFirebaseAuthState";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import React from "react";

const DesktopHeaderContent = () => {
  const { user } = useFirebaseAuthState();
  const { t } = useTranslation();

  return (
    <>
      <Logo />

      <Stack flexGrow={1} direction="row" justifyContent="center" spacing={2}>
        <NavMenu prefix="" navigation={OVERVIEW_NAVIGATION} />
        {HEADER_NAVIGATIONS.map((category, index) => (
          <NavMenu prefix="categories" navigation={category} key={index} />
        ))}
      </Stack>

      <Box
        sx={(theme) => ({
          display: "flex",
          justifyContent: "flex-end",
          gap: theme.spacing(2),
        })}
      >
        <div>
          <NextLink href="/search" passHref>
            <IconButton color="primary" size="large">
              <SearchIcon />
            </IconButton>
          </NextLink>
        </div>

        <NotificationMenu />

        {user ? (
          <DropdownMenu
            buttonBuilder={(buttonProps, ref) => (
              <AuthenticationButton {...buttonProps} ref={ref} />
            )}
            offsetY={20}
            offsetX={-50}
          >
            <AuthenticationMenu width={300} />
          </DropdownMenu>
        ) : (
          <NextLink href="/auth" passHref>
            <Button variant="contained" color="primary">
              <span>{t("Sign In")}</span>
            </Button>
          </NextLink>
        )}

        <DropdownMenu
          buttonBuilder={(buttonProps) => (
            <IconButton color="primary" {...buttonProps} size="large">
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
