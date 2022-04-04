import MenuArrow from "@/components/DropdownMenu/MenuArrow";
import { UncontrolledDropDownMenuProps } from "@/components/DropdownMenu/UncontrolledDropDownMenu";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import {
  bindMenu,
  bindToggle,
  PopupState,
} from "material-ui-popup-state/hooks";
import React, { useRef } from "react";

interface ControlledDropDownMenuProps extends UncontrolledDropDownMenuProps {
  popupState: PopupState;
}

const ControlledDropDownMenu: React.FC<ControlledDropDownMenuProps> = ({
  title,
  titleNode,
  buttonBuilder,
  children,
  offsetX,
  offsetY,
  PaperProps,
  popupState,
  ...otherMenuProps
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const buttonWidth = buttonRef.current?.clientWidth;
  const menuMinWidth = buttonWidth ? buttonWidth + 100 : undefined;

  const isOpen = popupState.isOpen;

  let buttonComponent;
  if (buttonBuilder) {
    buttonComponent = buttonBuilder(
      {
        ...bindToggle(popupState),
        className: isOpen ? "Mui-selected" : "",
      },
      buttonRef,
      isOpen
    );
  } else {
    buttonComponent = (
      <Button
        variant="text"
        color="secondary"
        className={isOpen ? "Mui-selected" : ""}
        {...bindToggle(popupState)}
        ref={buttonRef}
      >
        <Box marginRight={1}>{titleNode ?? title}</Box>
        <MenuArrow isOpen={isOpen} />
      </Button>
    );
  }
  return (
    <>
      {buttonComponent}
      <Menu
        {...bindMenu(popupState)}
        {...otherMenuProps}
        style={{
          ...otherMenuProps.style,
          transform: `translate(${offsetX ?? 0}px, ${offsetY ?? 0}px)`,
        }}
        PaperProps={{
          ...PaperProps,
          style: {
            overflow: "visible",
            minWidth: menuMinWidth,
          },
        }}
      >
        {children}
      </Menu>
    </>
  );
};

export default ControlledDropDownMenu;
