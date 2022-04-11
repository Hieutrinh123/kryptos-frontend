import { useInputState } from "#/hooks/useInputState";
import { useShowAlertEffect } from "#/hooks/useShowAlert";
import { useFirebaseAuthErrorMessage } from "#/utils/firebaseAuthErrorMessage";
import { Locale } from "@/api";
import { firebaseAuth } from "@/firebase/firebase";
import { Button, CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NextImage from "next/image";
import NextLink from "next/link";
import logo from "public/logo.png";
import React, { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import isEmail from "validator/lib/isEmail";

const ResetPasswordPageLogo: React.FC = () => (
  <Stack alignItems="center">
    <Box width={80} height={80}>
      <NextImage src={logo} />
    </Box>
    <Typography variant="h5" fontWeight="bold">
      KRYPTOS
    </Typography>
  </Stack>
);

const ResetPasswordPage: NextPage = () => {
  const [sendPasswordResetEmail, loading, error] =
    useSendPasswordResetEmail(firebaseAuth);
  const { t } = useTranslation();
  const [email, setEmail, emailError, setEmailError] = useInputState("");
  const [emailSent, setEmailSent] = useState(false);
  useShowAlertEffect(useFirebaseAuthErrorMessage(error));

  const handleSubmit = () => {
    if (!email || !email.length) {
      return setEmailError(t("Email must not be empty"));
    }
    if (!isEmail(email)) {
      return setEmailError(t("Invalid email"));
    }
    sendPasswordResetEmail(email).then(() => {
      setEmailSent(true);
    });
  };

  return (
    <Box
      bgcolor="background.secondary"
      py={4}
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Container maxWidth="md">
        <Stack spacing={4} alignItems="center" width="100%">
          <ResetPasswordPageLogo />
          <Divider />
          {!emailSent ? (
            loading ? (
              <CircularProgress />
            ) : (
              <form onSubmit={handleSubmit} style={{ width: 300 }}>
                <Stack spacing={2}>
                  <Typography variant="h6" textAlign="center">
                    {t("Input your email")}
                  </Typography>

                  <TextField
                    id="email"
                    label="Email"
                    variant="filled"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    helperText={emailError}
                    error={!!emailError}
                  />
                  <Button variant="contained" color="primary" type="submit">
                    <span>{t("Reset Password")}</span>
                  </Button>
                </Stack>
              </form>
            )
          ) : (
            <Typography align="center">
              {`${t("We have sent an email to")} ${email}. `}
              <br />
              {t(
                "Please follow the instruction in the email to recover your password."
              )}
            </Typography>
          )}
          <Stack spacing={1}>
            <NextLink href="/auth" passHref>
              <Link underline="none" alignSelf="center">
                {t("Recalled your password? Sign in")}
              </Link>
            </NextLink>
            <NextLink href="/" passHref>
              <Link underline="none" alignSelf="center">
                {t("Back to Home")}
              </Link>
            </NextLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default ResetPasswordPage;

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale as Locale)),
    },
  };
};
