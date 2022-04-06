import { getInitials } from "#/utils/naming";
import { useFirebaseAuthState } from "@/firebase/auth/useFirebaseAuthState";
import AuthenticationMenu from "@/containers/AuthenticationMenu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { CircularProgress, ListItemIcon } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import LoginIcon from "@mui/icons-material/Login";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import React, { useEffect } from "react";

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
  const { t } = useTranslation();
  const { user, loading } = useFirebaseAuthState();
  useEffect(() => {
    if (!loading && !user && open) {
      onClose();
    }
  }, [loading, onClose, open, user]);
  if (loading) {
    return <CircularProgress />;
  }
  if (!user) {
    return (
      <NextLink href="/auth" passHref>
        <ListItemButton sx={{ height: 80 }}>
          <ListItemText
            primary={t("Sign In")}
            primaryTypographyProps={{ textAlign: "right" }}
            secondaryTypographyProps={{ textAlign: "right" }}
            sx={{ marginRight: 4 }}
          />

          <ListItemIcon>
            <LoginIcon fontSize="large" />
          </ListItemIcon>
        </ListItemButton>
      </NextLink>
    );
  }
  return (
    <>
      <ListItemButton onClick={open ? onClose : onOpen} sx={{ height: 80 }}>
        <Box marginRight={4}>{open ? <ExpandLess /> : <ExpandMore />}</Box>
        <ListItemText
          primary={t("My Account")}
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
