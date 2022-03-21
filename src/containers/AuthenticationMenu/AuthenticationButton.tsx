import { firebaseAuth } from "#/config/firebase";
import UserAvatar from "@/containers/UserAvatar";
import { CircularProgress } from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface AuthenticationButtonProps extends ButtonProps {}

const AuthenticationButton: React.FC<AuthenticationButtonProps> = (props) => {
  const [user, loading, error] = useAuthState(firebaseAuth);
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return (
      <Button {...props} variant="contained" color="error">
        <span>Đăng nhập lỗi, vui lòng thử lại</span>
      </Button>
    );
  }
  if (user) {
    return (
      <Button {...props} variant="contained" color="primary">
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <UserAvatar user={user} height={25} width={25} />
          <Typography textTransform="none">{user.displayName}</Typography>
        </Stack>
      </Button>
    );
  }
  return (
    <Button {...props} variant="contained" color="primary">
      <span>Đăng nhập</span>
    </Button>
  );
};

export default React.forwardRef<HTMLButtonElement, AuthenticationButtonProps>(
  (props, ref) => <AuthenticationButton {...props} ref={ref} />
);
