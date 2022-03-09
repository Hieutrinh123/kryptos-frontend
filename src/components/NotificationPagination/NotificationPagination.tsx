import { Box, Button } from "@mui/material";
import React from "react";
import BasicPagination from "../BasicPagination";

interface PaginationNotificationProps {
  count: number;
}

const NotificationPagination: React.FC<PaginationNotificationProps> = ({
  count,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "32px 0 64px",
      }}
    >
      <BasicPagination count={count} />
      <Button
        sx={{
          fontWeight: 900,
          fontSize: 14,
          lineHeight: "14px",
          color: "#ffffff",
        }}
      >
        Cũ hơn
      </Button>
    </Box>
  );
};

export default NotificationPagination;
