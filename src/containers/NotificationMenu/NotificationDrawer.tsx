import { grey } from "#/styles/colors";
import { useNotifications } from "@/api";
import NotificationMenuContent from "@/containers/NotificationMenu/NotificationMenuContent";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { SwipeableDrawer } from "@mui/material";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { useBoolean } from "usehooks-ts";

interface NotificationMenuProps {}

const NotificationMenu: React.FC<NotificationMenuProps> = ({}) => {
  const {
    notifications,
    loading: loadingNotifications,
    hasUnread,
  } = useNotifications();

  const {
    value: isMenuOpen,
    setFalse: closeMenu,
    setTrue: openMenu,
  } = useBoolean(false);
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <>
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
        <IconButton
          color="primary"
          disabled={loadingNotifications}
          onClick={openMenu}
        >
          {loadingNotifications ? (
            <CircularProgress size={24} />
          ) : (
            <NotificationsIcon />
          )}
        </IconButton>
      </Badge>

      <SwipeableDrawer
        anchor="right"
        PaperProps={{
          sx: {
            width: "100%",
            borderRadius: 0,
            bgcolor: grey["400"],
          },
        }}
        open={isMenuOpen}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        onClose={closeMenu}
        onOpen={openMenu}
      >
        <Box>
          <IconButton size="large" onClick={closeMenu}>
            <CloseIcon />
          </IconButton>
        </Box>
        <NotificationMenuContent notifications={notifications} />
      </SwipeableDrawer>
    </>
  );
};

export default NotificationMenu;
