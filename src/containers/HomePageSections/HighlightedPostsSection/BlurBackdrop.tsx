import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import React from "react";

export const BlurBackdrop = () => {
  return (
    <Box
      position="absolute"
      borderRadius="50%"
      height="100%"
      width="100%"
      sx={{
        backgroundColor: alpha("#001E6C", 0.75),
      }}
    />
  );
};
