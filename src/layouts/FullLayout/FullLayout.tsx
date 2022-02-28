import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React from "react";
import Footer from "@/containers/Footer";
import Header from "@/containers/Header";

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
      <Container component="main" sx={{ flex: "1 0" }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default FullLayout;
