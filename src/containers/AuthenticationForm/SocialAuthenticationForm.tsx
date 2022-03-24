import { firebaseAuth } from "#/config/firebase";
import { useSnackbarState } from "#/utils/useSnackbarState";
import AlertSnackbar from "@/components/AlertSnackbar";
import GoogleIcon from "@mui/icons-material/Google";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

interface SocialAuthenticationFormProps {}

const SocialAuthenticationForm: React.FC<
  SocialAuthenticationFormProps
> = ({}) => {
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(firebaseAuth);

  const googleSnackbarState = useSnackbarState(googleError?.message, 6000);

  if (googleUser) {
    return null;
  }
  return (
    <Stack spacing={3} width={320}>
      <Typography variant="h5" fontWeight="bold" textAlign="center">
        Đăng nhập bằng tài khoản mạng xã hội
      </Typography>

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

      <AlertSnackbar
        {...googleSnackbarState}
        severity="error"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </Stack>
  );
};

export default SocialAuthenticationForm;
