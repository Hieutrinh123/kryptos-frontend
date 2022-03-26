import { useFirebaseAuthState } from "#/hooks/useFirebaseAuthState";
import { useShowAlert } from "#/hooks/useShowAlert";
import { useUserExtraData } from "#/hooks/useUserExtraData";
import EmailAuthenticationForm from "@/containers/AuthenticationForm/EmailAuthenticationForm";
import SocialAuthenticationForm from "@/containers/AuthenticationForm/SocialAuthenticationForm";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
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
  const [user, loadingUser] = useFirebaseAuthState();
  const [userExtraData, loadingExtraData] = useUserExtraData(user);
  const showAlert = useShowAlert();

  useEffect(() => {
    if (!loadingUser && !loadingExtraData && user) {
      if (userExtraData) {
        router
          .replace("/")
          .then(() => showAlert("Đăng nhập thành công", "success"));
      } else {
        router
          .replace("/profile")
          .then(() =>
            showAlert(
              "Chào mừng đến với KryptosNews. Hãy cập nhật một số thông tin cá nhân của bạn",
              "info"
            )
          );
      }
    }
  }, [loadingUser, user, router, loadingExtraData, userExtraData, showAlert]);

  return (
    <Box bgcolor="background.secondary" py={4}>
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
