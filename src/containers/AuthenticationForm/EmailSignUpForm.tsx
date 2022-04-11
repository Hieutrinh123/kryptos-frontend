import { firebaseAuth } from "@/firebase/firebase";
import { useShowAlertEffect } from "#/hooks/useShowAlert";
import { useFirebaseAuthErrorMessage } from "#/utils/firebaseAuthErrorMessage";
import EmailFormFields from "@/containers/AuthenticationForm/EmailFormFields";
import { t } from "i18next";

import React from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

interface EmailSignUpProps {}

const EmailSignUpForm: React.FC<EmailSignUpProps> = ({}) => {
  const [
    signUpWithEmail,
    emailSignUpUser,
    emailSignUpLoading,
    emailSignUpError,
  ] = useCreateUserWithEmailAndPassword(firebaseAuth, {
    sendEmailVerification: true,
  });

  useShowAlertEffect(useFirebaseAuthErrorMessage(emailSignUpError), "error");

  if (emailSignUpUser) {
    return null;
  }
  return (
    <EmailFormFields
      submitButtonLabel={t("Sign In")}
      onSubmit={signUpWithEmail}
      loading={emailSignUpLoading}
    />
  );
};

export default EmailSignUpForm;
