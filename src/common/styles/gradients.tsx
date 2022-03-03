import { primary } from "#/styles/colors";
import { alpha } from "@mui/material/styles";
import React from "react";

export const glassGradient = `linear-gradient(98.63deg, ${primary.main} 11.76%, ${primary.light} 96.82%)`;
export const glassGradientWithAlpha = (alphaValue: number) => {
  const mainColor = alpha(primary.main, alphaValue);
  const lightColor = alpha(primary.light, alphaValue);
  return `linear-gradient(98.63deg, ${mainColor} 11.76%, ${lightColor} 96.82%)`;
};

export const textColorGradient = {
  background: glassGradient,

  webkitBackgroundClip: "text",
  backgroundClip: "text",

  webkitTextFillColor: "transparent",
  textFillColor: "transparent",
  color: "transparent",
};

export const textColorUngradient = {
  background: "unset",

  webkitBackgroundClip: "unset",
  backgroundClip: "unset",

  webkitTextFillColor: "unset",
  textFillColor: "unset",
  color: "unset",
};

export const SVGGradient = () => (
  <svg
    style={{ width: 0, height: 0, position: "absolute" }}
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient id="glass-gradient" x1="0%" y1="43%" x2="100%" y2="57%">
        <stop offset="0%" stopColor="#4795E3" />
        <stop offset="50%" stopColor="#4BC1E4" />
      </linearGradient>
    </defs>
  </svg>
);
