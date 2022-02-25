import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import styles from "./FullLayout.module.scss";
import Footer from "./Footer";
import Header from "./Header";
import React from "react";

interface FullLayoutProps {
  children: React.ReactNode;
}

const FullLayout: React.FC<FullLayoutProps> = ({ children }) => {
  return (
    <Box className={styles.fullLayout}>
      <Header />
      <Container component="main" className={styles.content}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default FullLayout;
