import { useShowAlert } from "#/hooks/useShowAlert";
import { Locale } from "@/api";
import EmailAuthenticationForm from "@/containers/AuthenticationForm/EmailAuthenticationForm";
import SocialAuthenticationForm from "@/containers/AuthenticationForm/SocialAuthenticationForm";
import { useUserData } from "@/firebase/firestore/useUserData";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NextImage from "next/image";
import { useRouter } from "next/router";
import logo from "public/logo.png";
import React, { useEffect } from "react";

const LoginPageLogo: React.FC = () => (
  <Stack alignItems="center">
    <Box width={80} height={80}>
      <NextImage src={logo} />
    </Box>
    <Typography variant="h5" fontWeight="bold">
      KRYPTOS
    </Typography>
  </Stack>
);

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { user, loading: loadingUser, isNew } = useUserData();
  const showAlert = useShowAlert();
  const { t } = useTranslation();
  useEffect(() => {
    if (!loadingUser && user && !_.isNil(isNew)) {
      if (isNew) {
        router
          .replace("/profile")
          .then(() =>
            showAlert(t("Please update your personal profile"), "success")
          );
      } else {
        router
          .replace("/")
          .then(() => showAlert("Signed in successfully", "success"));
      }
    }
  }, [isNew, loadingUser, router, showAlert, t, user]);

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
        <Stack spacing={4} alignItems="center">
          <LoginPageLogo />
          <Divider />
          <SocialAuthenticationForm />
          <Divider />
          <EmailAuthenticationForm />
        </Stack>
      </Container>
    </Box>
  );
};

export default LoginPage;

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale as Locale)),
    },
  };
};
