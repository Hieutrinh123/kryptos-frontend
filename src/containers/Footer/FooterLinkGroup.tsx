import { Category } from "#/config/category";
import { Box, Link, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import React from "react";

interface FooterLinkGroupProps {
  navOption: Category;
  disableRoot?: boolean;
  prefix?: string;
}

export function normalizeSlash(s: string): string {
  const multipleSlashRegex = /\/+/g;
  return s.replace(multipleSlashRegex, "/");
}
const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({
  navOption,
  disableRoot,
  prefix = "categories",
}) => {
  // Todo: make this element not using Category type, but accept a general NavigationOptions type
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        alignSelf: "flex-start",
        display: "inline-block",
      }}
    >
      {disableRoot ? (
        <Typography fontWeight="bolder" fontSize={17} color="white">
          {t(navOption.title)}
        </Typography>
      ) : (
        <NextLink
          href={normalizeSlash(`/${prefix}/${navOption.slug}`)}
          passHref
        >
          <Link
            underline="none"
            fontWeight="bolder"
            fontSize={17}
            color="white"
          >
            {t(navOption.title)}
          </Link>
        </NextLink>
      )}
      {navOption.subcategories && (
        <Stack
          component="ul"
          spacing={1}
          sx={{
            fontSize: "1rem",
            listStyleType: "none",
            padding: 0,
          }}
        >
          {navOption.subcategories.map((subcategory, index) => (
            <li key={index}>
              <NextLink
                href={normalizeSlash(`/${prefix}/${subcategory.slug}`)}
                passHref
              >
                <Link underline="none" color="white">
                  {t(subcategory.title)}
                </Link>
              </NextLink>
            </li>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default FooterLinkGroup;
