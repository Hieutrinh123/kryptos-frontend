import { Navigation } from "#/config/navigation";
import { joinPath } from "#/utils/path";
import { Box, Link, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import React from "react";

interface FooterLinkGroupProps {
  navOption: Navigation;
  disableRoot?: boolean;
  prefix?: string;
}

const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({
  navOption,
  prefix = "",
}) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        alignSelf: "flex-start",
        display: "inline-block",
        marginBottom: 3,
      }}
    >
      {navOption.slug ? (
        <NextLink href={"/" + joinPath(prefix, navOption.slug)} passHref>
          <Link
            underline="none"
            fontWeight="bolder"
            fontSize={18}
            color="white"
          >
            {t(navOption.title)}
          </Link>
        </NextLink>
      ) : (
        <Typography fontWeight="bolder" fontSize={18} color="white">
          {t(navOption.title)}
        </Typography>
      )}
      {navOption.subnavigations && (
        <Stack
          component="ul"
          spacing={1}
          sx={{
            fontSize: "1rem",
            listStyleType: "none",
            padding: 0,
          }}
        >
          {navOption.subnavigations.map((subnavigation) => (
            <li key={subnavigation.slug}>
              <NextLink
                href={"/" + joinPath(prefix, subnavigation.slug)}
                passHref
              >
                <Link underline="none" color="white">
                  {t(subnavigation.title)}
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
