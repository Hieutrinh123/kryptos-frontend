import Box from "@mui/material/Box";
import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Box
      component="footer"
      sx={{
        height: 300,
        backgroundColor: "grey.900",
        color: "white"
      }}
    >
      Footer
    </Box>
  );
};

export default Footer;
