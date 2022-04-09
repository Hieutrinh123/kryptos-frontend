import { NAVIGATIONS, OVERVIEW_NAVIGATION } from "#/config/navigation";
import { useNotifications } from "@/api";
import DropdownMenu from "@/components/DropdownMenu";
import Logo from "@/components/Logo/Logo";
import AuthenticationMenu from "@/containers/AuthenticationMenu";
import AuthenticationButton from "@/containers/Header/DesktopHeaderContent/AuthenticationButton";
import NavMenu from "@/containers/Header/DesktopHeaderContent/DesktopNavMenu";
import NotificationMenu from "@/containers/NotificationMenu";
import SettingsMenu from "@/containers/SettingMenu";
import { useFirebaseAuthState } from "@/firebase/auth/useFirebaseAuthState";
import NotificationsButton from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import React from "react";
import { grey } from "#/styles/colors";

const DesktopHeaderContent = () => {
  const { user } = useFirebaseAuthState();
  const { t } = useTranslation();
  const {
    notifications,
    loading: loadingNotifications,
    hasUnread,
  } = useNotifications();

  return (
    <>
      <Logo />

      <Stack flexGrow={1} direction="row" justifyContent="center" spacing={2}>
        <NavMenu prefix="" navigation={OVERVIEW_NAVIGATION} />
        {NAVIGATIONS.map((category, index) => (
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
        <NextLink href="/search" passHref>
          <IconButton color="primary">
            <SearchIcon />
          </IconButton>
        </NextLink>

        <DropdownMenu
          offsetY={20}
          buttonBuilder={(buttonProps, ref) => {
            if (loadingNotifications) {
              return <CircularProgress />;
            }
            return (
              <Badge
                variant="dot"
                color="primary"
                overlap="circular"
                componentsProps={{
                  badge: {
                    style: {
                      display: hasUnread ? "unset" : "none",
                      zIndex: 100,
                    },
                  },
                }}
              >
                <IconButton color="primary" {...buttonProps} ref={ref}>
                  <NotificationsButton />
                </IconButton>
              </Badge>
            );
          }}
          PaperProps={{
            sx: {
              bgcolor: grey["400"],
            },
          }}
        >
          <NotificationMenu notifications={notifications} />
        </DropdownMenu>

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
