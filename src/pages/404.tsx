import { getPageSettings, Locale } from "@/api";
import FullLayout from "@/layouts/FullLayout";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NextImage from "next/image";
import React from "react";
import logo from "public/logo.png";

const Logo: React.FC = () => (
  <Stack alignItems="center">
    <Box width={80} height={80}>
      <NextImage src={logo} />
    </Box>
    <Typography variant="h5" fontWeight="bold">
      KRYPTOS
    </Typography>
  </Stack>
);

const PrivacyPolicyPage: NextPage = ({}) => {
  return (
    <FullLayout>
      <Container
        sx={{
          paddingY: 6,
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Stack spacing={4}>
          <Logo />
          <Typography fontWeight="bold" variant="h5" textAlign="center">
            Not found
          </Typography>
        </Stack>
      </Container>
    </FullLayout>
  );
};

export default PrivacyPolicyPage;

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale as Locale)),
      pageSettings: await getPageSettings(context.locale as Locale),
    },
    revalidate: true,
  };
};
