import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import logo from "public/logo.png";

interface LogoProps {
  type: "header" | "footer";
}

const Logo: React.FC<LogoProps> = (props) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      marginRight={2}
    >
      <Image src={logo} alt="Logo" height={36} width={36} />
      <Typography
        variant="h6"
        fontWeight="bolder"
        fontSize="1.5rem"
        sx={(theme) => ({
          marginLeft: theme.spacing(2),
          display: {
            xs: props.type === "header" ? "none" : "unset",
            md: "unset",
          },
        })}
      >
        KRYPTOS
      </Typography>
    </Box>
  );
};

export default Logo;
