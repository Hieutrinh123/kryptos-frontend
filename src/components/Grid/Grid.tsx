import { Grid as MuiGrid, GridProps } from "@mui/material";
import React from "react";

interface CustomGridProps
  extends Omit<GridProps, "xl" | "lg" | "md" | "sm" | "xs"> {
  mobile?: GridProps["xs"];
  tablet?: GridProps["md"];
  desktop?: GridProps["lg"];
}

const Grid: React.FC<CustomGridProps> = ({
  mobile,
  tablet,
  desktop,
  ...rest
}) => {
  return <MuiGrid xs={mobile} md={tablet} lg={desktop} {...rest} />;
};

export default Grid;
