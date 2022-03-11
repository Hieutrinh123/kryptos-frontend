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
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        background: theme.palette.background.default,
      })}
    >
      <Header />
      <Box component="main" sx={{ flex: "1 0" }}>
        {children}
      </Box>
      <Footer />
      <GoToTopButton />
    </Box>
  );
};

export default FullLayout;
