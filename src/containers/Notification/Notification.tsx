import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import ListNotification from "../ListNotification";

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
      <ListNotification />
    </Box>
  );
};

export default Notification;
