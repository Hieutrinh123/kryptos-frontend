import { FOOTER_NAVIGATIONS, OVERVIEW_NAVIGATION } from "#/config/navigation";
import { usePageSettings } from "@/api";
import Grid from "@/components/Grid";
import Logo from "@/components/Logo/Logo";
import SocialLinks from "@/containers/SocialLinks";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import React from "react";
import FooterLinkGroup from "./FooterLinkGroup";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  const pageSettings = usePageSettings();
  return (
    <Box
      component="footer"
      bgcolor="black"
      sx={(theme) => ({
        py: theme.spacing(8),
      })}
    >
      <Container>
        <Grid container spacing={5}>
          <Grid item mobile={12} desktop={4}>
            <Stack spacing={3}>
              <Logo color="white" />

              <Typography color="white">{pageSettings.introduction}</Typography>

              <SocialLinks color="#fff" />
            </Stack>
          </Grid>

          <Grid item mobile={12} desktop={8}>
            <Box
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                flexDirection: "column",
                maxHeight: 300,
                gap: theme.spacing(2),
                [theme.breakpoints.down("tablet")]: {
                  maxHeight: 1000,
                },
              })}
            >
              <FooterLinkGroup navOption={OVERVIEW_NAVIGATION} />
              {FOOTER_NAVIGATIONS.map((category, index) => (
                <FooterLinkGroup
                  prefix="categories"
                  key={index}
                  navOption={category}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
