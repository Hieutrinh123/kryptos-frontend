import { firebaseAuth } from "#/config/firebase";
import { getFirebaseAuthErrorMessage } from "#/utils/firebaseAuthErrorMessage";
import { useSnackbarState } from "#/utils/useSnackbarState";
import AlertSnackbar from "@/components/AlertSnackbar";
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
  const signUpError = useSnackbarState(
    getFirebaseAuthErrorMessage(emailSignUpError),
    6000
  );

  if (emailSignUpUser) {
    return null;
  }
  return (
    <>
      <EmailFormFields
        submitButtonLabel="Đăng ký"
        onSubmit={signUpWithEmail}
        loading={emailSignUpLoading}
      />

      <AlertSnackbar
        {...signUpError}
        severity="error"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </>
  );
};

export default EmailSignUpForm;
