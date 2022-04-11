import { firebaseAuth } from "@/firebase/firebase";
import { useShowAlertEffect } from "#/hooks/useShowAlert";
import { useFirebaseAuthErrorMessage } from "#/utils/firebaseAuthErrorMessage";
import EmailFormFields from "@/containers/AuthenticationForm/EmailFormFields";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NextLink from "next/link";

import React from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useTranslation } from "next-i18next";

interface EmailSignInFormProps {}

const EmailSignInForm: React.FC<EmailSignInFormProps> = ({}) => {
  const [
    signInWithEmail,
    emailSignInUser,
    emailSignInLoading,
    emailSignInError,
  ] = useSignInWithEmailAndPassword(firebaseAuth);
  const { t } = useTranslation();

  useShowAlertEffect(useFirebaseAuthErrorMessage(emailSignInError), "error");

  if (emailSignInUser) {
    return null;
  }

  return (
    <>
      <Stack spacing={2}>
        <EmailFormFields
          submitButtonLabel={t("Sign In")}
          onSubmit={signInWithEmail}
          loading={emailSignInLoading}
        />

        <NextLink href="/reset-password" passHref>
          <Link underline="none" alignSelf="center">
            {t("Forgot Password")}
          </Link>
        </NextLink>
      </Stack>
    </>
  );
};

export default EmailSignInForm;
