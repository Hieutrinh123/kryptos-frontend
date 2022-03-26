import { firebaseAuth } from "#/config/firebase";
import UserAvatar from "@/containers/UserAvatar";
import { CircularProgress } from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";
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
      <button
        {...props}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <UserAvatar user={user} sx={{ height: 40, width: 40 }} />
      </button>
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
