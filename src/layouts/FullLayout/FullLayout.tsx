import GoToTopButton from "@/components/GoToTopButton";
import Footer from "@/containers/Footer";
import Header from "@/containers/Header";
import Box from "@mui/material/Box";
import React from "react";

interface FullLayoutProps {
  children: React.ReactNode;
}

const FullLayout: React.FC<FullLayoutProps> = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={(theme) => ({
        background: theme.palette.background.default,
      })}
    >
      <Header />
      <Box component="main" flexGrow={1} display="flex" flexDirection="column">
        {children}
      </Box>
      <Footer />
      <GoToTopButton />
    </Box>
  );
};

export default FullLayout;
