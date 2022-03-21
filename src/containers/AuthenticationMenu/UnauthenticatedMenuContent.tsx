import { firebaseAuth } from "#/config/firebase";
import { useSnackbarState } from "#/utils/useSnackbarState";
import AlertSnackbar from "@/components/AlertSnackbar";
import EmailAuthenticationForm from "@/containers/AuthenticationMenu/EmailAuthenticationForm";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import GoogleIcon from "@mui/icons-material/Google";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

interface UnauthenticatedMenuContentProps {}

const UnauthenticatedMenuContent: React.FC<
  UnauthenticatedMenuContentProps
> = ({}) => {
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(firebaseAuth);

  const googleSnackbarState = useSnackbarState(googleError?.message, 6000);

  if (googleUser) {
    return null;
  }
  return (
    <Stack spacing={2}>
      <Button
        variant="contained"
        color="primary"
        sx={{ minHeight: 40 }}
        onClick={() => signInWithGoogle()}
      >
        {googleLoading ? (
          <CircularProgress size={20} />
        ) : (
          <Stack direction="row" alignContent="center" spacing={2}>
            <GoogleIcon />
            <span>Đăng nhập với Google</span>
          </Stack>
        )}
      </Button>

      <Typography variant="h6" textAlign="center">
        Hoặc
      </Typography>

      <EmailAuthenticationForm />

      <AlertSnackbar
        {...googleSnackbarState}
        severity="error"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </Stack>
  );
};

export default UnauthenticatedMenuContent;
