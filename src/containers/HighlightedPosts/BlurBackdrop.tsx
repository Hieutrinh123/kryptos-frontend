import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import React from "react";
import styles from "./BlurBackdrop.module.scss";

export const BlurBackdrop = () => (
  <Box
    position="absolute"
    borderRadius="50%"
    height="60vw"
    width="60vw"
    className={styles.blurBackdrop}
    sx={(theme) => ({
      top: "5vw",
      left: "20vw",
      transform: "translate(-50%, -50%)",
      backgroundColor: alpha(theme.palette.grey["800"], 0.75),
    })}
  />
);
