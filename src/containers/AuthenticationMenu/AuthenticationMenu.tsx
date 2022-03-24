import { firebaseAuth } from "#/config/firebase";
import DropdownMenu from "@/components/DropdownMenu";
import AuthenticatedMenuContent from "@/containers/AuthenticationMenu/AuthenticatedMenuContent";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthenticationButton from "./AuthenticationButton";
import NextLink from "next/link";

interface AuthenticationMenuProps {}

const AuthenticationMenu: React.FC<AuthenticationMenuProps> = ({}) => {
  const [user, loading] = useAuthState(firebaseAuth);
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
      buttonBuilder={(buttonProps) => <AuthenticationButton {...buttonProps} />}
    >
      <Box padding={3} width={300}>
        <AuthenticatedMenuContent />
      </Box>
    </DropdownMenu>
  );
};

export default AuthenticationMenu;
