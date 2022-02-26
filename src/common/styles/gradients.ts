import { primary } from "#/styles/colors";

export const glassGradient = `linear-gradient(98.63deg, ${primary.main} 11.76%, ${primary.light} 96.82%)`;

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
