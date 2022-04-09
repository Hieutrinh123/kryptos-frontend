import { AppNotification } from "@/api";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React from "react";
import NotificationList from "./NotificationList";

interface NotificationMenuProps {
  notifications: AppNotification[] | undefined;
}

const NotificationMenu: React.FC<NotificationMenuProps> = ({
  notifications
}) => {
  const { t } = useTranslation();
  return (
    <Stack
      padding={4}
      maxHeight={500}
      width={500}
      sx={{ overflowY: "scroll" }}
      spacing={4}
    >
      <Typography
        fontSize={36}
        textAlign="center"
        fontWeight="bolder"
        color="white"
      >
        {t("Newest Notifications")}
      </Typography>
      <NotificationList notifications={notifications} />
    </Stack>
  );
};

export default NotificationMenu;
