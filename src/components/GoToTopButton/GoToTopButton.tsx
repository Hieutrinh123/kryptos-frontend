import { glassGradient } from "#/styles/gradients";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import React, { useEffect, useState } from "react";

interface ButtonGotoTopProps {}

const GoToTopButton: React.FC<ButtonGotoTopProps> = ({}) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  });
  return (
    <Fade in={isVisible}>
      <Box
        position="fixed"
        bottom="48px"
        right="48px"
        zIndex={1000}
        display={{ md: "block", xs: "none" }}
      >
        <Button
          sx={{
            width: "45px",
            minWidth: "45px",
            height: "45px",
            background: glassGradient,
            borderRadius: "50%",
          }}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <ArrowDropUp
            sx={{
              color: "#ffffff",
            }}
          />
        </Button>
      </Box>
    </Fade>
  );
};

export default GoToTopButton;
