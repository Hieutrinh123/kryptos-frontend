import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import logo from "public/logo.png";

const Logo: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      sx={(theme) => ({ marginRight: theme.spacing(2) })}
    >
      <Image src={logo} alt="Logo" height={36} width={36} />
      <Typography
        variant="h6"
        fontWeight="bolder"
        fontSize="1.5rem"
        sx={(theme) => ({
          marginLeft: theme.spacing(2),
          display: { xs: "none", md: "unset" },
        })}
      >
        KRYPTOS
      </Typography>
    </Box>
  );
};

export default Logo;
