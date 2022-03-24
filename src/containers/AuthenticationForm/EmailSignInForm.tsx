import { firebaseAuth } from "#/config/firebase";
import { getFirebaseAuthErrorMessage } from "#/utils/firebaseAuthErrorMessage";
import { useSnackbarState } from "#/utils/useSnackbarState";
import AlertSnackbar from "@/components/AlertSnackbar";
import EmailFormFields from "@/containers/AuthenticationForm/EmailFormFields";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NextLink from "next/link";

import React from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

interface EmailSignInFormProps {}

const EmailSignInForm: React.FC<EmailSignInFormProps> = ({}) => {
  const [
    signInWithEmail,
    emailSignInUser,
    emailSignInLoading,
    emailSignInError,
  ] = useSignInWithEmailAndPassword(firebaseAuth);

  const signInError = useSnackbarState(
    getFirebaseAuthErrorMessage(emailSignInError),
    6000
  );

  if (emailSignInUser) {
    return null;
  }

  return (
    <>
      <Stack spacing={2}>
        <EmailFormFields
          submitButtonLabel="Đăng nhập"
          onSubmit={signInWithEmail}
          loading={emailSignInLoading}
        />

        <NextLink href="/reset-password" passHref>
          <Link underline="none" alignSelf="center">
            Quên mật khẩu
          </Link>
        </NextLink>
      </Stack>

      <AlertSnackbar
        {...signInError}
        severity="error"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </>
  );
};

export default EmailSignInForm;
