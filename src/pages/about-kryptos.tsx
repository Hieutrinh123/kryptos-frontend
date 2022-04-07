import { REVALIDATE_STATIC_FILE_TIME } from "#/config/caching";
import { getPageSettings, Locale } from "@/api";
import Grid from "@/components/Grid";
import FullLayout from "@/layouts/FullLayout";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NextImage from "next/image";
import { Textfit } from "react-textfit";
import fullLogo from "public/full-logo.png";
import header from "public/header.png";
import contentImage from "public/content.png";
import research from "public/research.png";

const AboutUsPage: NextPage = ({}) => {
  return (
    <FullLayout>
      <Header />
      <Body />
    </FullLayout>
  );
};
export default AboutUsPage;

const Header = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        background: "linear-gradient(99.18deg, #2588E4 0%, #0057A8 87.23%);",
        overflow: "hidden",
      }}
      height="100vh"
      width="100%"
      position="relative"
    >
      <Box
        position="relative"
        left={{ mobile: "-50%", tablet: 0, desktop: "50%" }}
        top={{ mobile: "60%", tablet: "40%", desktop: 0 }}
        width={{ mobile: "200%", desktop: "100%" }}
      >
        <NextImage src={header} />
      </Box>

      <Box
        position="absolute"
        width={{ mobile: "90%", desktop: "50%" }}
        height="100%"
        left={{ mobile: "5%", desktop: "10%" }}
        top={{ mobile: "5%", desktop: "25%" }}
      >
        <Stack spacing={2}>
          <Typography variant="h1" fontWeight="bolder" color="white">
            <Textfit style={{ width: "100%" }} mode="single">
              {t("About Us")}
            </Textfit>
          </Typography>
          <Typography
            variant="body1"
            color="white"
            textAlign="justify"
            fontSize={20}
          >
            {t("about.introduction")}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

const Body = () => {
  const { t } = useTranslation();
  return (
    <Container maxWidth="desktop" sx={{ paddingY: 6 }}>
      <Grid container rowSpacing={6} columnSpacing={5}>
        <Grid item mobile={12}>
          <Typography variant="h2" fontWeight="bold" align="center">
            {t("Our Services")}
          </Typography>
        </Grid>

        <DividerGrid />

        <Grid item mobile={12} tablet={6} desktop={7}>
          <Stack spacing={2}>
            <Typography variant="h3" fontWeight="bold">
              {t("Research")}
            </Typography>
            <Typography>{t("about.research")}</Typography>
            <ContactButton />
          </Stack>
        </Grid>
        <Grid item mobile={12} tablet={6} desktop={5}>
          <NextImage src={research} />
        </Grid>

        <DividerGrid />

        <Grid item mobile={12} tablet={6} desktop={5}>
          <NextImage src={contentImage} />
        </Grid>

        <Grid item mobile={12} tablet={6} desktop={7}>
          <Stack spacing={2}>
            <Typography variant="h3" fontWeight="bold">
              {t("Content Planning")}
            </Typography>
            <Typography>
              {t("about.content")}
              <ul style={{ listStylePosition: "inside", padding: "20px" }}>
                <li>{t("about.content.line-1")}</li>
                <li>{t("about.content.line-2")}</li>
              </ul>
            </Typography>
            <ContactButton />
          </Stack>
        </Grid>

        <DividerGrid />

        <Grid item mobile={12} tablet={6} desktop={7}>
          <Stack spacing={2}>
            <Typography variant="h3" fontWeight="bold">
              {t("Marketing")}
            </Typography>
            <Typography>{t("about.marketing")}</Typography>
            <ContactButton />
          </Stack>
        </Grid>

        <Grid item mobile={12} tablet={6} desktop={5}>
          <NextImage src={fullLogo} />
        </Grid>
      </Grid>
    </Container>
  );
};

const DividerGrid = () => (
  <Grid item mobile={12}>
    <Divider />
  </Grid>
);

const ContactButton = () => {
  const { t } = useTranslation();
  return (
    <Button color="primary" variant="contained" href="mailto:info@kryptos.media">
      <span>{t("Contact Us")}</span>
    </Button>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale as Locale;

  const pageSettings = await getPageSettings(locale);

  return {
    props: {
      ...(await serverSideTranslations(context.locale as Locale)),
      pageSettings,
    },
    revalidate: REVALIDATE_STATIC_FILE_TIME,
  };
};
