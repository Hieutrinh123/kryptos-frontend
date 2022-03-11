import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import NotificationList from "./NotificationList";

interface NotificationProps {}

const Notification: React.FC<NotificationProps> = ({}) => {
  return (
    <Box
      sx={{
        padding: "45px 32px 0 32px",
      }}
    >
      <Typography
        component="div"
        variant="h4"
        textAlign="center"
        marginBottom="48px"
        fontWeight={900}
      >
        Thông báo mới nhất
      </Typography>
      <NotificationList />
    </Box>
  );
};

export default Notification;
