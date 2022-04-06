import Logo from "@/components/Logo/Logo";
import { MobileDrawer } from "./MobileDrawer";
import Box from "@mui/material/Box";
import React from "react";

const MobileAndTabletHeaderContent = () => {
  return (
    <>
      <Logo compact />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "row-reverse",
        }}
      >
        <MobileDrawer />
      </Box>
    </>
  );
};

export default MobileAndTabletHeaderContent;
