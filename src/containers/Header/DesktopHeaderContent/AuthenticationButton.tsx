import { firebaseAuth } from "@/firebase/firebase";
import UserAvatar from "@/containers/UserAvatar";
import { CircularProgress } from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";
import NextLink from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface AuthenticationButtonProps extends ButtonProps {}

const AuthenticationButton = React.forwardRef<
  HTMLButtonElement,
  AuthenticationButtonProps
>((props, ref) => {
  const [user, loading, error] = useAuthState(firebaseAuth);
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return (
      <NextLink href="/auth" passHref>
        <Button {...props} variant="contained" color="error">
          <span>Đăng nhập lỗi, vui lòng thử lại</span>
        </Button>
      </NextLink>
    );
  }
  if (user) {
    return (
      <button
        ref={ref}
        {...props}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <UserAvatar user={user} sx={{ height: 40, width: 40 }} />
      </button>
    );
  }
  return null;
});

AuthenticationButton.displayName = "AuthenticationButton";

export default AuthenticationButton;
