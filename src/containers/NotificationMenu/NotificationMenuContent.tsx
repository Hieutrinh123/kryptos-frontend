import { AppNotification, useSeenNotification } from "@/api";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React from "react";
import NotificationList from "./NotificationList";

interface NotificationMenuContentProps {
  notifications: AppNotification[] | undefined;
}

const NotificationMenuContent: React.FC<NotificationMenuContentProps> = ({
  notifications,
}) => {
  const { t } = useTranslation();
  useSeenNotification();
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

export default NotificationMenuContent;
