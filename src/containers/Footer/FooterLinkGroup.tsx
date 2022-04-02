import { Category } from "#/config/category";
import { Box, Link, Stack } from "@mui/material";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import React from "react";

interface FooterLinkGroupProps {
  category: Category;
}

const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({ category }) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        alignSelf: "flex-start",
        display: "inline-block",
      }}
    >
      <NextLink href={"/categories/" + category.slug} passHref>
        <Link underline="none" fontWeight="bold" color="white">
          {t(category.title)}
        </Link>
      </NextLink>
      {category.subcategories && (
        <Stack
          component="ul"
          spacing={1}
          sx={{
            fontSize: "1rem",
            listStyleType: "none",
            padding: 0,
          }}
        >
          {category.subcategories.map((subcategory, index) => (
            <li key={index}>
              <NextLink href={"/categories/" + subcategory.slug} passHref>
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
