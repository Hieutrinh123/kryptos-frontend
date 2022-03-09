import { glassGradient } from "#/styles/gradients";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import React from "react";

interface ButtonGotoTopProps {}

const GoToTopButton: React.FC<ButtonGotoTopProps> = ({}) => {
  return (
    <Box
      position="fixed"
      bottom="48px"
      right="48px"
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
      >
        <ArrowDropUp
          sx={{
            color: "#ffffff",
          }}
        />
      </Button>
    </Box>
  );
};

export default GoToTopButton;
