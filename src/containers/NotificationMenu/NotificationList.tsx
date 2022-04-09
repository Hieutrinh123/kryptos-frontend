import { getLocalizedRelativeTime } from "#/utils/relativeTime";
import { AppNotification, Locale } from "@/api";
import AuthorAvatar from "@/containers/AuthorAvatar";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import NextLink from "next/link";

interface ListNotificationProps {
  notifications: AppNotification[] | undefined;
}

const NotificationList: React.FC<ListNotificationProps> = ({
  notifications,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  if (!notifications) {
    return <Typography>{t("No Notification")}</Typography>;
  }

  return (
    <List>
      {notifications.map((notification, idx) => {
        const author = notification.post.author;
        return (
          <NextLink
            href={`/posts/${notification.post.slug}`}
            passHref
            key={idx}
          >
            <ListItemButton alignItems="center">
              <ListItemAvatar>
                <AuthorAvatar
                  author={author}
                  sx={{ width: 40, height: 40 }}
                  badge={!notification.viewed}
                />
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{
                  fontWeight: "bolder",
                  color: "white",
                }}
                secondaryTypographyProps={{ color: "white" }}
                primary={`${author.first_name} ${author.last_name}`}
                secondary={t("has created a new post")}
              />
              <ListItemText
                sx={{ flex: "unset" }}
                secondaryTypographyProps={{ color: "#BDBDBD" }}
                secondary={getLocalizedRelativeTime(
                  new Date(notification.post.updated_at + "Z"),
                  router.locale as Locale
                )}
              />
            </ListItemButton>
          </NextLink>
        );
      })}
    </List>
  );
};

export default NotificationList;
