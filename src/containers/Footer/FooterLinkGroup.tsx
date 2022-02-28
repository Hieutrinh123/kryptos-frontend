import { getFullSublinkHref, NavOption } from "#/config/navigation";
import { Box, Link, Stack } from "@mui/material";
import NextLink from "next/link";
import React from "react";

interface FooterLinkGroupProps {
  navOption: NavOption;
}

const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({ navOption }) => {
  return (
    <Box
      sx={(theme) => ({
        alignSelf: "flex-start",
        display: "inline-block",
      })}
    >
      <NextLink href={"/" + navOption.href} passHref>
        <Link underline="none" fontWeight="bold">
          {navOption.title}
        </Link>
      </NextLink>
      {navOption.sublinks && (
        <Stack
          component="ul"
          spacing={1}
          sx={{
            fontSize: "1rem",
            listStyleType: "none",
            padding: 0,
          }}
        >
          {navOption.sublinks.map((link, index) => (
            <li key={index}>
              <NextLink
                href={getFullSublinkHref(navOption.href, link.href)}
                passHref
              >
                <Link underline="none">{link.title}</Link>
              </NextLink>
            </li>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default FooterLinkGroup;
