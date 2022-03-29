import { useUserData } from "#/../api/hooks/firestore/useUserData";
import { useShowAlert } from "#/hooks/useShowAlert";
import EmailAuthenticationForm from "@/containers/AuthenticationForm/EmailAuthenticationForm";
import SocialAuthenticationForm from "@/containers/AuthenticationForm/SocialAuthenticationForm";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import { NextPage } from "next";
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
  useEffect(() => {
    if (!loadingUser && user && !_.isNil(isNew)) {
      if (isNew) {
        router
          .replace("/profile")
          .then(() =>
            showAlert("Hãy cập nhật thông tin cá nhân của bạn", "success")
          );
      } else {
        router
          .replace("/")
          .then(() => showAlert("Đăng nhập thành công", "success"));
      }
    }
  }, [isNew, loadingUser, router, showAlert, user]);

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
