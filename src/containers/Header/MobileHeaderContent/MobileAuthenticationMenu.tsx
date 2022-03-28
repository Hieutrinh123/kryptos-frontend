import { useFirebaseAuthState } from "#/hooks/auth/useFirebaseAuthState";
import { grey } from "#/styles/colors";
import { getInitials } from "#/utils/naming";
import AuthenticationMenu from "@/containers/AuthenticationMenu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { CircularProgress } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React from "react";

interface MobileAuthenticationMenuProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const MobileAuthenticationMenu: React.FC<MobileAuthenticationMenuProps> = ({
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
          primary="Tài khoản của tôi"
          secondary={user.displayName}
          primaryTypographyProps={{ textAlign: "right" }}
          secondaryTypographyProps={{ textAlign: "right" }}
          sx={{ marginRight: 4 }}
        />

        <ListItemAvatar>
          <Avatar src={user.photoURL ?? undefined}>
            {getInitials(user.displayName)}
          </Avatar>
        </ListItemAvatar>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <AuthenticationMenu hideInfo />
      </Collapse>
    </>
  );
};

export default MobileAuthenticationMenu;
