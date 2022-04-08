import { useIsMobile } from "#/styles/responsive";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import NextLink from "next/link";
import logo from "public/logo.png";
import React from "react";

interface LogoProps {
  color?: string;
  compact?: boolean;
}

const Logo: React.FC<LogoProps> = ({ color, compact }) => {
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
          <Image
            src={logo}
            alt="Logo"
            height={isMobile ? 24 : 36}
            width={isMobile ? 24 : 36}
          />
          {!compact && (
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
