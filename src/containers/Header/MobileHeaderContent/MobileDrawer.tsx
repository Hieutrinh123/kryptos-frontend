import { grey } from "#/styles/colors";
import MobileAuthenticationMenu from "@/containers/Header/MobileHeaderContent/MobileAuthenticationMenu";
import MobileSettingsMenu from "@/containers/Header/MobileHeaderContent/MobileSettingsMenu";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { SwipeableDrawer } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import { useBoolean } from "usehooks-ts";
import MobileNavMenu from "./MobileNavMenu";

type PaneName = "nav" | "account" | "settings";

export const MobileDrawer = ({}) => {
  const {
    value: isMenuOpen,
    setFalse: closeMenu,
    setTrue: openMenu,
  } = useBoolean(false);
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [currentPane, setCurrentPane] = useState<PaneName>("nav");
  const getPaneOpener = (paneName: PaneName) => () => {
    setCurrentPane(paneName);
  };

  const closePane = () => {
    setCurrentPane("nav");
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={openMenu}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="right"
        PaperProps={{
          sx: { width: "100%", borderRadius: 0, background: grey["500"] },
        }}
        open={isMenuOpen}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        onClose={closeMenu}
        onOpen={openMenu}
      >
        <Stack justifyContent="space-between" height="100%">
          <Box>
            <IconButton size="large" onClick={closeMenu}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box flex={1}>
            <MobileNavMenu open={currentPane === "nav"} />
          </Box>

          <Box>
            <MobileAuthenticationMenu
              open={currentPane === "account"}
              onOpen={getPaneOpener("account")}
              onClose={closePane}
            />

            <MobileSettingsMenu
              open={currentPane === "settings"}
              onOpen={getPaneOpener("settings")}
              onClose={closePane}
            />
          </Box>
        </Stack>
      </SwipeableDrawer>
    </>
  );
};
