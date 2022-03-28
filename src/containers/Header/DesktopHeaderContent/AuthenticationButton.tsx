import { firebaseAuth } from "#/config/firebase";
import UserAvatar from "@/containers/UserAvatar";
import { CircularProgress } from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import NextLink from "next/link";

interface DesktopAuthButtonProps extends ButtonProps {}

const DesktopAuthButton: React.FC<DesktopAuthButtonProps> = (props) => {
  const [user, loading, error] = useAuthState(firebaseAuth);
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return (
      <NextLink href="/profile" passHref>
        <Button {...props} variant="contained" color="error">
          <span>Đăng nhập lỗi, vui lòng thử lại</span>
        </Button>
      </NextLink>
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
    <NextLink href="/profile" passHref>
      <Button {...props} variant="contained" color="primary">
        <span>Đăng nhập</span>
      </Button>
    </NextLink>
  );
};

export default React.forwardRef<HTMLButtonElement, DesktopAuthButtonProps>(
  (props, ref) => <DesktopAuthButton {...props} ref={ref} />
);
