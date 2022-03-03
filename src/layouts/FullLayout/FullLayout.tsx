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
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Header />
      <Box component="main" sx={{ flex: "1 0" }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default FullLayout;
