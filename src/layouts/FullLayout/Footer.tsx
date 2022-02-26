import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React from "react";
import Typography from "@mui/material/Typography";


interface FooterLinkGroupProps {
  title: string;
}
const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({
  title,
  children,
}) => {
  return (
    <Box sx={(theme) => ({ padding: theme.spacing(1), fontSize: "0.8rem" })}>
      <Typography fontWeight="bold" maxWidth={100}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        backgroundColor: "grey.900",
        paddingTop: theme.spacing(2),
      })}
      color="white"
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item md={4}>
            Kryptos là kênh cung cấp dữ liệu, tin tức và nghiên cứu để độc giả
            đi đầu xu thế thị trường tiền điện tử và đưa ra các quyết định đầu
            tư tốt nhất
          </Grid>

          <Grid item md={8}>
            <Box
              display="flex"
              flexDirection="column"
              flexWrap="wrap"
              sx={(theme) => ({
                height: 300,
                [theme.breakpoints.down("sm")]: {
                  height: 500,
                },
              })}
            >
              <FooterLinkGroup title="Giới thiệu">
                <p>Về Kryptosnews</p>
                <p>Về Kryptosnews</p>
                <p>Về Kryptosnews</p>
              </FooterLinkGroup>

              <FooterLinkGroup title="Phân tích kỹ thuật">
                <p>Phân tích On-chain</p>
                <p>Phân tích On-chain</p>
              </FooterLinkGroup>

              <FooterLinkGroup title="Phân tích chuyên sâu">
                <p>DeFi</p>
                <p>NFT</p>
                <p>DeFi</p>
                <p>NFT</p>
              </FooterLinkGroup>

              <FooterLinkGroup title="Phân tích dự án" />

              <FooterLinkGroup title="Phân tích chuyên sâu">
                <p>DeFi</p>
                <p>NFT</p>
                <p>DeFi</p>
                <p>NFT</p>
              </FooterLinkGroup>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
