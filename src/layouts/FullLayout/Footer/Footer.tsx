import { social } from "@/common/config/navigation";
import { Box, Container, Grid, Link, Stack, Typography } from "@mui/material";
import Image from "next/image";

import React from "react";
import Logo from "@/common/components/Logo";
import { footerLink } from "./data";
import FooterLinkGroup from "./FooterLinkGroup";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Box
      component="footer"
      color="white"
      sx={(theme) => ({
        backgroundColor: "grey.900",
        marginTop: theme.spacing(2),
        py: theme.spacing(8),
      })}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid
            item
            xs={12}
            md={4}
            sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              maxHeight: 300,
              [theme.breakpoints.down("md")]: {
                height: 200,
              },
              [theme.breakpoints.down("sm")]: {
                height: 250,
              },
            })}
          >
            <Logo type="footer" />

            <Typography>
              Kryptos là kênh cung cấp dữ liệu, tin tức và nghiên cứu để độc giả
              đi đầu xu thế thị trường tiền điện tử và đưa ra các quyết định đầu
              tư tốt nhất
            </Typography>

            <Stack spacing={{ xs: 4, md: 2 }} direction="row">
              {social.map((item, index) => (
                <Link href={item.href} key={index}>
                  <Image src={item.image} alt={item.title} />
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                flexDirection: "column",
                maxHeight: 300,
                gap: theme.spacing(2),
                [theme.breakpoints.down("sm")]: {
                  maxHeight: 600,
                },
              })}
            >
              {footerLink.map((item, index) => (
                <FooterLinkGroup
                  key={index}
                  title={item.title}
                  items={item.links}
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
