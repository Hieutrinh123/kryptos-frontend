import { getInitials } from "#/utils/naming";
import { useFirebaseAuthState } from "@/api/hooks/auth/useFirebaseAuthState";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import React from "react";

interface AuthenticationMenuProps {
  width?: number;
  hideInfo?: boolean;
}

const AuthenticationMenu: React.FC<AuthenticationMenuProps> = ({
  width,
  hideInfo,
}) => {
  const { t } = useTranslation();
  const { user, loading, signOut } = useFirebaseAuthState();

  if (!user) {
    return null;
  }
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <List sx={{ paddingY: 0, width }}>
      {!hideInfo && (
        <ListItem>
          <ListItemAvatar>
            <Avatar src={user.photoURL ?? undefined}>
              {getInitials(user.displayName)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.displayName} />
        </ListItem>
      )}

      <Divider />

      <ListItem disablePadding>
        <NextLink href="/profile" passHref>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={t("My Account")} />
          </ListItemButton>
        </NextLink>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton onClick={signOut}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={t("Sign Out")} />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default AuthenticationMenu;
