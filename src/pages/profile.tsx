import { getPageSettings, Locale } from "@/api";
import Grid from "@/components/Grid";
import PersonalAuthorList from "@/containers/PersonalAuthorList";
import PersonalPostList from "@/containers/PersonalPostList";
import UserInformationManagement from "@/containers/UserInformationManagement";
import { useAuthStateWithRedirect } from "@/firebase/auth/useFirebaseAuthState";
import FullLayout from "@/layouts/FullLayout";
import { Container, ListItemText } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Paper from "@mui/material/Paper";
import { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";

interface ProfilePageProps {}

const ProfilePage: NextPage<ProfilePageProps> = ({}) => {
  useAuthStateWithRedirect("/auth");
  const [panel, setPanel] = useState("liked");
  const { t } = useTranslation();

  return (
    <FullLayout>
      <Container sx={{ paddingY: 5 }}>
        <Grid container spacing={5}>
          <Grid item mobile={12}>
            <UserInformationManagement />
          </Grid>
          <Grid item mobile={12} tablet={4}>
            <Paper sx={{ padding: 3, position: "sticky", top: 100 }}>
              <List>
                <ListItemButton onClick={() => setPanel("liked")}>
                  <ListItemText primary={t("Liked Posts")} />
                </ListItemButton>

                <ListItemButton onClick={() => setPanel("bookmarked")}>
                  <ListItemText primary={t("Bookmarked Posts")} />
                </ListItemButton>

                <ListItemButton onClick={() => setPanel("following")}>
                  <ListItemText primary={t("Following Authors")} />
                </ListItemButton>
              </List>
            </Paper>
          </Grid>
          <Grid item mobile={12} tablet={8}>
            <SubPanel panel={panel} />
          </Grid>
        </Grid>
      </Container>
    </FullLayout>
  );
};

const SubPanel: React.FC<{ panel: string }> = ({ panel }) => {
  const { t } = useTranslation();
  if (panel === "liked") {
    return <PersonalPostList title={t("Liked Posts")} field="liked" />;
  }
  if (panel === "bookmarked") {
    return (
      <PersonalPostList title={t("Bookmarked Posts")} field="bookmarked" />
    );
  }
  if (panel === "following") {
    return <PersonalAuthorList title={t("Following Authors")} />;
  }
  return null;
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
