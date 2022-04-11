import { firebaseAuth } from "@/firebase/firebase";
import { useShowAlertEffect } from "#/hooks/useShowAlert";
import { useFirebaseAuthErrorMessage } from "#/utils/firebaseAuthErrorMessage";
import GoogleIcon from "@mui/icons-material/Google";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React from "react";
import {
  useSignInWithFacebook,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";

interface SocialAuthenticationFormProps {}

const SocialAuthenticationForm: React.FC<
  SocialAuthenticationFormProps
> = ({}) => {
  const { t } = useTranslation();
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(firebaseAuth);

  const [signInWithFacebook, facebookUser, facebookLoading, facebookError] =
    useSignInWithFacebook(firebaseAuth);

  useShowAlertEffect(useFirebaseAuthErrorMessage(googleError), "error");
  useShowAlertEffect(useFirebaseAuthErrorMessage(facebookError), "error");

  if (googleUser || facebookUser) {
    return null;
  }
  return (
    <Stack spacing={3} width={320}>
      <Typography variant="h5" fontWeight="bold" textAlign="center">
        {t("Sign In with Social Accounts")}
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
            <span>{t("Sign In with Google")}</span>
          </Stack>
        )}
      </Button>

      <Button
        variant="contained"
        color="primary"
        sx={{ minHeight: 40 }}
        onClick={() => signInWithFacebook()}
      >
        {facebookLoading ? (
          <CircularProgress size={20} />
        ) : (
          <Stack direction="row" alignContent="center" spacing={2}>
            <GoogleIcon />
            <span>{t("Sign In with Facebook")}</span>
          </Stack>
        )}
      </Button>
    </Stack>
  );
};

export default SocialAuthenticationForm;
