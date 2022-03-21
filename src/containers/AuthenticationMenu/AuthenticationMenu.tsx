import { firebaseAuth } from "#/config/firebase";
import DropdownMenu from "@/components/DropdownMenu";
import AuthenticatedMenuContent from "@/containers/AuthenticationMenu/AuthenticatedMenuContent";
import UnauthenticatedMenuContent from "@/containers/AuthenticationMenu/UnauthenticatedMenuContent";
import Box from "@mui/material/Box";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthenticationButton from "./AuthenticationButton";

interface AuthenticationMenuProps {}

const AuthenticationMenu: React.FC<AuthenticationMenuProps> = ({}) => {
  const [user] = useAuthState(firebaseAuth);
  return (
    <DropdownMenu
      buttonBuilder={(buttonProps) => <AuthenticationButton {...buttonProps} />}
    >
      <Box padding={3} width={500}>
        {user ? <AuthenticatedMenuContent /> : <UnauthenticatedMenuContent />}
      </Box>
    </DropdownMenu>
  );
};

export default AuthenticationMenu;
