import { navOptions, social } from "#/config/navigation";
import Logo from "@/components/Logo/Logo";
import { Box, Container, Link, Stack, Typography } from "@mui/material";
import Grid from "@/components/Grid";
import Image from "next/image";

import React from "react";
import FooterLinkGroup from "./FooterLinkGroup";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Box
      component="footer"
      color="white"
      sx={(theme) => ({
        marginTop: theme.spacing(2),
        py: theme.spacing(8),
      })}
    >
      <Container>
        <Grid container spacing={5}>
          <Grid
            item
            mobile={12}
            desktop={4}
            sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              maxHeight: 300,
              [theme.breakpoints.down("mobile")]: {
                height: 200,
              },
            })}
          >
            <Logo type="footer" />

            <Typography>
              Kryptos là kênh cung cấp dữ liệu, tin tức và nghiên cứu để độc giả
              đi đầu xu thế thị trường tiền điện tử và đưa ra các quyết định đầu
              tư tốt nhất
            </Typography>

            <Stack spacing={2} direction="row">
              {social.map((item, index) => (
                <Link href={item.href} key={index}>
                  <Image src={item.image} alt={item.title} />
                </Link>
              ))}
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
                [theme.breakpoints.down("mobile")]: {
                  maxHeight: 600,
                },
              })}
            >
              {navOptions.map((navOption, index) => (
                <FooterLinkGroup key={index} navOption={navOption} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
