import { firebaseAuth } from "#/config/firebase";
import { getInitials } from "#/utils/naming";
import DropdownMenu from "@/components/DropdownMenu";
import { signOut } from "@firebase/auth";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import NextLink from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthenticationButton from "./AuthenticationButton";

interface AuthenticationMenuProps {}

const AuthenticationMenu: React.FC<AuthenticationMenuProps> = ({}) => {
  const [user, loading] = useAuthState(firebaseAuth);

  const handleSignOut = () => signOut(firebaseAuth);

  if (!user) {
    return (
      <NextLink href="/auth" passHref>
        <Button variant="contained" color="primary">
          <span>Đăng nhập</span>
        </Button>
      </NextLink>
    );
  }
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <DropdownMenu
      offsetY={20}
      buttonBuilder={(buttonProps) => <AuthenticationButton {...buttonProps} />}
    >
      <List sx={{ paddingY: 0, width: 300 }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={user.photoURL ?? undefined}>
              {getInitials(user.displayName)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.displayName} />
        </ListItem>

        <Divider />

        <ListItem disablePadding>
          <NextLink href="/profile" passHref>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Tài khoản của tôi" />
            </ListItemButton>
          </NextLink>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={handleSignOut}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Đăng xuất" />
          </ListItemButton>
        </ListItem>
      </List>
    </DropdownMenu>
  );
};

export default AuthenticationMenu;
