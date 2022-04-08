import Box from "@mui/material/Box";
import React from "react";

interface BackgroundLayoutProps {
  children: React.ReactNode;
  color?: string;
}

const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({
  children,
  color,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={(theme) => ({
        background: color ?? theme.palette.background.default,
      })}
    >
      {children}
    </Box>
  );
};

export default BackgroundLayout;
