import { Box, Link, Stack, Typography } from "@mui/material";
import React from "react";
import { LinksKind } from "./data";

interface FooterLinkGroupProps {
  title: string;
  items: LinksKind[];
}
const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({ title, items }) => {
  return (
    <Box
      sx={(theme) => ({
        alignSelf: "flex-start",
        display: "inline-block",
      })}
    >
      <Typography fontWeight="700">{title}</Typography>
      <Stack
        component="ul"
        spacing={1}
        sx={{
          fontSize: "1rem",
          maxWidth: 100,
          lineHeight: "18.75px",
          listStyleType: "none",
        }}
      >
        {items.map((link, index) => (
          <li key={index + link.text}>
            <Link
              href={link.href}
              underline="none"
              color="white"
              sx={{
                display: "inline-block",
                "&:hover": {
                  transform: "translateX(8px)",
                  transition: "transform .2s ease",
                },
              }}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </Stack>
    </Box>
  );
};

export default FooterLinkGroup;
