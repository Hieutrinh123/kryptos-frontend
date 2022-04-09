import Logo from "@/components/Logo/Logo";
import NotificationDrawer from "@/containers/NotificationMenu/NotificationDrawer";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import NextLink from "next/link";
import { MobileDrawer } from "./MobileDrawer";
import React from "react";

const MobileAndTabletHeaderContent = () => {
  return (
    <>
      <Logo compact />
      <Stack flex={1} alignItems="center" direction="row-reverse" spacing={1}>
        <MobileDrawer />

        <NextLink href="/search" passHref>
          <IconButton color="primary">
            <SearchIcon />
          </IconButton>
        </NextLink>

        <NotificationDrawer />
      </Stack>
    </>
  );
};

export default MobileAndTabletHeaderContent;
