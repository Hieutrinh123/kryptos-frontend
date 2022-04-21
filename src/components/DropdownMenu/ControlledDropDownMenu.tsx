import MenuArrow from "@/components/DropdownMenu/MenuArrow";
import { UncontrolledDropDownMenuProps } from "@/components/DropdownMenu/UncontrolledDropDownMenu";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import {
  bindHover,
  bindMenu,
  bindToggle,
  PopupState,
} from "material-ui-popup-state/hooks";

import HoverMenu from "material-ui-popup-state/HoverMenu";
import React, { useRef } from "react";

interface ControlledDropDownMenuProps extends UncontrolledDropDownMenuProps {
  popupState: PopupState;
}

const ControlledDropDownMenu: React.FC<ControlledDropDownMenuProps> = ({
  title,
  hover,
  disableClick,
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

  const toggle = disableClick ? {} : bindToggle(popupState);
  const hoverProps = hover ? bindHover(popupState) : {};
  const MenuComponent = hover ? HoverMenu : Menu;

  if (buttonBuilder) {
    buttonComponent = buttonBuilder(
      {
        ...toggle,
        ...hoverProps,
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
        {...toggle}
        {...hoverProps}
        ref={buttonRef}
      >
        <Box marginRight={1}>{titleNode ?? title}</Box>
        <MenuArrow isOpen={isOpen} />
      </Button>
    );
  }
  return (
    <div>
      {buttonComponent}
      <MenuComponent
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
      </MenuComponent>
    </div>
  );
};

export default ControlledDropDownMenu;
