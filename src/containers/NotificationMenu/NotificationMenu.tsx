import { grey } from "#/styles/colors";
import { useNotifications } from "@/api";
import DropdownMenu from "@/components/DropdownMenu";
import NotificationMenuContent from "@/containers/NotificationMenu/NotificationMenuContent";
import NotificationsButton from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import React from "react";

interface NotificationMenuProps {}

const NotificationMenu: React.FC<NotificationMenuProps> = ({}) => {
  const {
    notifications,
    loading: loadingNotifications,
    hasUnread,
  } = useNotifications();

  return (
    <DropdownMenu
      offsetY={20}
      buttonBuilder={(buttonProps, ref) => {
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
            <IconButton
              color="primary"
              {...buttonProps}
              size="large"
              ref={ref}
              disabled={loadingNotifications}
            >
              {loadingNotifications ? (
                <CircularProgress size={24} />
              ) : (
                <NotificationsButton />
              )}
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
      <NotificationMenuContent notifications={notifications} />
    </DropdownMenu>
  );
};

export default NotificationMenu;
