import React from "react";
import { CATEGORIES } from "#/config/navigation";
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
          {CATEGORIES.map((category) => (
            <Stack key={category.slug} alignItems="flex-end" spacing={1}>
              <NextLink passHref href={"/categories/" + category.slug}>
                <MuiLink
                  underline="none"
                  sx={(theme) => ({ color: theme.palette.text.primary })}
                >
                  <Typography variant="h6">{category.title}</Typography>
                </MuiLink>
              </NextLink>
              {category.subcategories?.map((subcategory) => (
                <NextLink
                  passHref
                  href={"/categories/" + subcategory.slug}
                  key={subcategory.slug}
                >
                  <MuiLink
                    underline="none"
                    sx={(theme) => ({ color: theme.palette.text.primary })}
                  >
                    {subcategory.title}
                  </MuiLink>
                </NextLink>
              ))}
            </Stack>
          ))}
        </Stack>
      </Box>
    </Collapse>
  );
};

export default MobileNavMenu;
