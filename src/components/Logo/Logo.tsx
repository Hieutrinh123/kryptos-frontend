import { useIsMobile } from "#/styles/responsive";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import logo from "public/logo.png";
import NextLink from "next/link";

interface LogoProps {
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ color }) => {
  const isMobile = useIsMobile();
  return (
    <NextLink href="/" passHref>
      <a>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          marginRight={2}
        >
          <Image src={logo} alt="Logo" height={36} width={36} />
          {!isMobile && (
            <Typography
              variant="h6"
              fontWeight="bolder"
              fontSize="1.5rem"
              color={color}
              sx={(theme) => ({
                marginLeft: theme.spacing(2),
              })}
            >
              KRYPTOS
            </Typography>
          )}
        </Box>
      </a>
    </NextLink>
  );
};

export default Logo;
