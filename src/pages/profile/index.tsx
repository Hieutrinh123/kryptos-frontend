import { Locale } from "@/api";
import { useAuthStateWithRedirect } from "@/firebase/auth/useFirebaseAuthState";
import { getPageSettings } from "@/api";
import UserInformationManagement from "@/containers/UserInformationManagement";
import FullLayout from "@/layouts/FullLayout";
import { Container } from "@mui/material";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

interface ProfilePageProps {}

const ProfilePage: NextPage<ProfilePageProps> = ({}) => {
  useAuthStateWithRedirect("/auth");
  return (
    <FullLayout>
      <Container sx={{ paddingY: 5 }}>
        <UserInformationManagement />
      </Container>
    </FullLayout>
  );
};

export default ProfilePage;

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale as Locale)),
      pageSettings: await getPageSettings(context.locale as Locale),
    },
  };
};
