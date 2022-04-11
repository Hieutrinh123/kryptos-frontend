import EmailSignInForm from "@/containers/AuthenticationForm/EmailSignInForm";
import EmailSignUpForm from "@/containers/AuthenticationForm/EmailSignUpForm";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React from "react";
import { useBoolean } from "usehooks-ts";

interface EmailAuthenticationFormProps {}
const EmailAuthenticationForm: React.FC<
  EmailAuthenticationFormProps
> = ({}) => {
  const { t } = useTranslation();
  const { value: isSigningIn, toggle } = useBoolean(true);
  return (
    <Stack spacing={2} width={320} alignItems="center">
      <Typography variant="h4" fontWeight="bold">
        {isSigningIn ? t("Sign In") : t("Sign Up")}
      </Typography>
      <Typography variant="subtitle1">
        {isSigningIn
          ? t("Input your email and password to sign in")
          : t("Input your email and password to sign up")}
      </Typography>

      {isSigningIn ? <EmailSignInForm /> : <EmailSignUpForm />}
      <Link
        onClick={toggle}
        underline="none"
        sx={{ cursor: "pointer" }}
        alignSelf="center"
      >
        {isSigningIn
          ? t("Don't have an account? Sign up")
          : t("Already had an account? Sign in")}
      </Link>
    </Stack>
  );
};

export default EmailAuthenticationForm;
