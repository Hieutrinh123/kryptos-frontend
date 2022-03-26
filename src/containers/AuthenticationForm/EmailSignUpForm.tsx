import { firebaseAuth } from "#/config/firebase";
import { useShowAlertEffect } from "#/hooks/useShowAlert";
import { getFirebaseAuthErrorMessage } from "#/utils/firebaseAuthErrorMessage";
import EmailFormFields from "@/containers/AuthenticationForm/EmailFormFields";

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

  useShowAlertEffect(getFirebaseAuthErrorMessage(emailSignUpError), "error");

  if (emailSignUpUser) {
    return null;
  }
  return (
    <EmailFormFields
      submitButtonLabel="Đăng ký"
      onSubmit={signUpWithEmail}
      loading={emailSignUpLoading}
    />
  );
};

export default EmailSignUpForm;
