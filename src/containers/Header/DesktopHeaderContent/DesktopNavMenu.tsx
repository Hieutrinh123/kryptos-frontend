import { Category } from "#/config/navigation";
import DropdownMenu from "@/components/DropdownMenu";
import Button from "@mui/material/Button";
import MuiLink from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import { usePopupState } from "material-ui-popup-state/hooks";
import Link from "next/link";
import React from "react";

interface DesktopNavMenuProps {
  category: Category;
}
const DesktopNavMenu: React.FC<DesktopNavMenuProps> = ({ category }) => {
  const popupState = usePopupState({
    popupId: "nav-menu-" + category.slug,
    variant: "popover",
  });

  if (category.subcategories) {
    return (
      <DropdownMenu
        popupState={popupState}
        title={category.title}
        offsetX={-20}
        offsetY={0}
      >
        {category.subcategories.map((subcategory) => (
          <Link
            passHref
            href={"/categories/" + subcategory.slug}
            key={subcategory.slug}
          >
            <a onClick={popupState.close}>
              <MenuItem>
                <MuiLink>{subcategory.title}</MuiLink>
              </MenuItem>
            </a>
          </Link>
        ))}
      </DropdownMenu>
    );
  }
  return (
    <Link passHref href={"/categories/" + category.slug}>
      <Button variant="text" color="secondary">
        <span>{category.title}</span>
      </Button>
    </Link>
  );
};

export default DesktopNavMenu;
