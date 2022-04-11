import ControlledDropDownMenu from "@/components/DropdownMenu/ControlledDropDownMenu";
import { PaperProps } from "@mui/material/Paper";
import { ButtonProps } from "@mui/material/Button";
import { MenuProps } from "@mui/material/Menu";
import { usePopupState } from "material-ui-popup-state/hooks";
import React from "react";

export interface UncontrolledDropDownMenuProps extends Omit<MenuProps, "open"> {
  title?: string;
  titleNode?: React.ReactNode;
  buttonBuilder?: (
    buttonProps: ButtonProps,
    ref: React.Ref<HTMLButtonElement>,
    isOpen?: boolean
  ) => React.ReactNode;
  offsetX?: number;
  offsetY?: number;
  PaperProps?: PaperProps;
  hover?: boolean;
}

const UncontrolledDropDownMenu: React.FC<UncontrolledDropDownMenuProps> = (
  props
) => {
  const popupState = usePopupState({
    popupId: "dropdownMenu",
    variant: "popover",
  });
  return <ControlledDropDownMenu popupState={popupState} {...props} />;
};

export default UncontrolledDropDownMenu;
