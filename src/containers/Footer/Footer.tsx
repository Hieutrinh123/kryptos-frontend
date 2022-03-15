import { categories } from "#/config/navigation";
import Grid from "@/components/Grid";
import Logo from "@/components/Logo/Logo";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import React from "react";
import FooterLinkGroup from "./FooterLinkGroup";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Box
      component="footer"
      bgcolor="black"
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
            <Logo type="footer" color="white" />

            <Typography color="white">
              Kryptos là kênh cung cấp dữ liệu, tin tức và nghiên cứu để độc giả
              đi đầu xu thế thị trường tiền điện tử và đưa ra các quyết định đầu
              tư tốt nhất
            </Typography>
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
              {categories.map((navOption, index) => (
                <FooterLinkGroup key={index} category={navOption} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
