import { useNotifications } from "@/api/notification";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React from "react";

interface ListNotificationProps {}

const NotificationList: React.FC<ListNotificationProps> = ({}) => {
  const notifications = useNotifications();
  return (
    <Box>
      <List sx={{ width: "600px", maxWidth: 600 }}>
        {notifications.map(
          ({ type, description, title, thumbnail, time }, idx) => (
            <ListItem alignItems="flex-start" key={idx}>
              <ListItemAvatar>
                <Badge
                  variant="dot"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: type === "author" ? "50%" : "12px",
                  }}
                >
                  <Avatar alt="thumbnail" src={thumbnail}>
                    T
                  </Avatar>
                </Badge>
              </ListItemAvatar>
              <ListItemText
                sx={{
                  flex: 1,
                }}
                primary={
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body1"
                    color="text.primary"
                    fontWeight={700}
                  >
                    {title}
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body1"
                      color="text.primary"
                      fontWeight={400}
                    >
                      {description}
                    </Typography>
                  </React.Fragment>
                }
              />
              <Typography
                variant="body2"
                sx={(theme) => ({
                  color: theme.palette.grey["300"],
                  fontWeight: "400",
                  alignSelf: "center",
                })}
              >
                {time.toDateString()}
              </Typography>
              <ArrowForwardIos
                sx={{ alignSelf: "center", marginLeft: "12px" }}
                fontSize="small"
              />
            </ListItem>
          )
        )}
      </List>
    </Box>
  );
};

export default NotificationList;
