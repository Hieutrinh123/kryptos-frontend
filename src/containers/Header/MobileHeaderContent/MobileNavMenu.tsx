import { joinPath } from "#/utils/path";
import { useTranslation } from "next-i18next";
import React from "react";
import {
  NAVIGATIONS,
  Navigation,
  OVERVIEW_NAVIGATION,
} from "#/config/navigation";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import NextLink from "next/link";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";

interface MobileNavMenuProps {
  open: boolean;
}
const MobileNavMenu: React.FC<MobileNavMenuProps> = ({ open }) => {
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Box padding={3}>
        <Stack spacing={3}>
          <MobileNavLinkGroup navigation={OVERVIEW_NAVIGATION} />
          {NAVIGATIONS.map((navigation) => (
            <MobileNavLinkGroup
              prefix="categories"
              navigation={navigation}
              key={navigation.slug}
            />
          ))}
        </Stack>
      </Box>
    </Collapse>
  );
};

interface MobileNavLinkGroupProps {
  navigation: Navigation;
  prefix?: string;
}
const MobileNavLinkGroup: React.FC<MobileNavLinkGroupProps> = ({
  navigation,
  prefix = "categories",
}) => {
  const { t } = useTranslation();
  return (
    <Stack alignItems="flex-end" spacing={1}>
      {navigation.slug ? (
        <NextLink passHref href={"/" + joinPath(prefix, navigation.slug)}>
          <MuiLink underline="none">
            <Typography variant="h6" color="text.primary">
              {t(navigation.title)}
            </Typography>
          </MuiLink>
        </NextLink>
      ) : (
        <Typography variant="h6" color="text.primary">
          {t(navigation.title)}
        </Typography>
      )}
      {navigation.subnavigations?.map((subnavigation) => (
        <NextLink
          passHref
          href={"/" + joinPath(prefix, subnavigation.slug)}
          key={subnavigation.slug}
        >
          <MuiLink
            underline="none"
            sx={(theme) => ({ color: theme.palette.text.primary })}
          >
            {t(subnavigation.title)}
          </MuiLink>
        </NextLink>
      ))}
    </Stack>
  );
};

export default MobileNavMenu;
