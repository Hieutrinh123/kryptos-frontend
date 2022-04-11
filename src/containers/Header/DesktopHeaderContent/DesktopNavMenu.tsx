import { Navigation } from "#/config/navigation";
import { joinPath } from "#/utils/path";
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
  navigation: Navigation;
  prefix: string;
}
const DesktopNavMenu: React.FC<DesktopNavMenuProps> = ({
  navigation,
  prefix = "",
}) => {
  const { t } = useTranslation();
  const popupState = usePopupState({
    popupId: "nav-menu-" + navigation.slug,
    variant: "popover",
  });

  if (navigation.subnavigations) {
    return (
      <DropdownMenu
        popupState={popupState}
        titleNode={
          <Typography fontSize={16} fontWeight="bold">
            {t(navigation.title)}
          </Typography>
        }
        hover
        offsetX={-20}
        offsetY={0}
      >
        {navigation.subnavigations.map((subcategory) => (
          <NextLink
            passHref
            href={"/" + joinPath(prefix, subcategory.slug)}
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
    <NextLink passHref href={"/categories/" + navigation.slug}>
      <Button variant="text" color="secondary">
        <Typography fontSize={16} fontWeight="bold">
          {t(navigation.title)}
        </Typography>
      </Button>
    </NextLink>
  );
};

export default DesktopNavMenu;
