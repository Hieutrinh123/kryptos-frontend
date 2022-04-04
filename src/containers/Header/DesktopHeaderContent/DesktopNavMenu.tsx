import { Category } from "#/config/category";
import DropdownMenu from "@/components/DropdownMenu";
import Button from "@mui/material/Button";
import MuiLink from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { usePopupState } from "material-ui-popup-state/hooks";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import React from "react";

interface DesktopNavMenuProps {
  category: Category;
}
const DesktopNavMenu: React.FC<DesktopNavMenuProps> = ({ category }) => {
  const { t } = useTranslation();
  const popupState = usePopupState({
    popupId: "nav-menu-" + category.slug,
    variant: "popover",
  });

  if (category.subcategories) {
    return (
      <DropdownMenu
        popupState={popupState}
        titleNode={
          <Typography fontSize="small" fontWeight="bold">
            {t(category.title)}
          </Typography>
        }
        offsetX={-20}
        offsetY={0}
      >
        {category.subcategories.map((subcategory) => (
          <NextLink
            passHref
            href={"/categories/" + subcategory.slug}
            key={subcategory.slug}
          >
            <MenuItem>
              <MuiLink onClick={popupState.close}>
                {t(subcategory.title)}
              </MuiLink>
            </MenuItem>
          </NextLink>
        ))}
      </DropdownMenu>
    );
  }
  return (
    <NextLink passHref href={"/categories/" + category.slug}>
      <Button variant="text" color="secondary">
        <Typography fontSize="small" fontWeight="bold">
          {t(category.title)}
        </Typography>
      </Button>
    </NextLink>
  );
};

export default DesktopNavMenu;
