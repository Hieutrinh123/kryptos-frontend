import { firebaseAuth } from "#/config/firebase";
import { getInitials } from "#/utils/username";
import { signOut } from "@firebase/auth";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface AuthenticatedMenuContentProps {}

const AuthenticatedMenuContent: React.FC<
  AuthenticatedMenuContentProps
> = ({}) => {
  const [user] = useAuthState(firebaseAuth);
  const handleSignOut = () => signOut(firebaseAuth);
  if (!user) {
    return null;
  }
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={user.photoURL ?? undefined}>
          {getInitials(user.displayName)}
        </Avatar>
        <Typography variant="h5">{user.displayName}</Typography>
      </Stack>
      <Button variant="contained" color="primary" onClick={handleSignOut}>
        <span>Đăng xuất</span>
      </Button>
    </Stack>
  );
};

export default AuthenticatedMenuContent;
