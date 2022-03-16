import ControlledDropDownMenu from "./ControlledDropDownMenu";
import UncontrolledDropDownMenu, {
  UncontrolledDropDownMenuProps,
} from "./UncontrolledDropDownMenu";
import { PopupState } from "material-ui-popup-state/hooks";
import React from "react";

interface DropDownMenuProps extends UncontrolledDropDownMenuProps {
  popupState?: PopupState;
}

const DropdownMenu: React.FC<DropDownMenuProps> = ({
  popupState,
  ...props
}) => {
  if (popupState) {
    return <ControlledDropDownMenu popupState={popupState} {...props} />;
  }
  return <UncontrolledDropDownMenu {...props} />;
};

export default DropdownMenu;
