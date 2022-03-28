import { useFirebaseAuthState } from "#/hooks/auth/useFirebaseAuthState";
import { grey } from "#/styles/colors";
import SettingsMenu from "@/containers/SettingMenu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";
import { CircularProgress, ListItemIcon } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React from "react";

interface MobileSettingsMenuProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const MobileSettingsMenu: React.FC<MobileSettingsMenuProps> = ({
  open,
  onOpen,
  onClose,
}) => {
  const { user, loading } = useFirebaseAuthState();
  if (loading) {
    return <CircularProgress />;
  }
  if (!user) {
    return null;
  }
  return (
    <>
      <ListItemButton
        onClick={open ? onClose : onOpen}
        sx={{ background: grey["600"], height: 80 }}
      >
        <Box marginRight={4}>{open ? <ExpandLess /> : <ExpandMore />}</Box>
        <ListItemText
          primary="Cài đặt"
          sx={{ marginRight: 4 }}
          primaryTypographyProps={{ textAlign: "right" }}
        />
        <ListItemIcon>
          <SettingsIcon fontSize="large" />
        </ListItemIcon>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <SettingsMenu />
      </Collapse>
    </>
  );
};

export default MobileSettingsMenu;
