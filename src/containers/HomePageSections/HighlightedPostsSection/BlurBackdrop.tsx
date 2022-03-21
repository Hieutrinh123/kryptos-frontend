import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import React from "react";
import styles from "./BlurBackdrop.module.scss";

export const BlurBackdrop = () => {
  return (
    <Box
      position="absolute"
      borderRadius="50%"
      height={{ mobile: "120vh", desktop: "150vh" }}
      width={{ mobile: "120vh", desktop: "150vh" }}
      className={styles.blurBackdrop}
      sx={(theme) => ({
        [theme.breakpoints.down("desktop")]: {
          top: "40vh",
          left: 0,
        },
        top: "5vw",
        left: "20vw",
        transform: "translate(-50%, -50%)",
        backgroundColor: alpha(theme.palette.grey["800"], 0.75),
      })}
    />
  );
};
