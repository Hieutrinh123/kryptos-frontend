import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ButtonProps, Menu, MenuProps, PaperProps } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  bindMenu,
  bindToggle,
  usePopupState,
} from "material-ui-popup-state/hooks";
import React, { useRef } from "react";

interface DropdownMenuProps extends Omit<MenuProps, "open"> {
  title?: string;
  buttonBuilder?: (
    buttonProps: ButtonProps,
    isOpen?: boolean
  ) => React.ReactNode;
  offsetX?: number;
  offsetY?: number;
  PaperProps?: PaperProps;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  title,
  buttonBuilder,
  children,
  offsetX,
  offsetY,
  PaperProps,
  ...otherMenuProps
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popupState = usePopupState({
    variant: "popover",
    popupId: "dropDownMenu",
  });

  const buttonWidth = buttonRef.current?.clientWidth;
  const menuMinWidth = buttonWidth ? buttonWidth + 100 : undefined;

  const isOpen = popupState.isOpen;

  let buttonComponent;
  if (buttonBuilder) {
    buttonComponent = buttonBuilder(
      {
        ref: buttonRef,
        ...bindToggle(popupState),
        className: isOpen ? "Mui-selected" : "",
      },
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
        <Box marginRight={1}>{title}</Box>
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
            minWidth: menuMinWidth,
          },
        }}
      >
        {children}
      </Menu>
    </>
  );
};

export default DropdownMenu;

interface MenuArrowProps {
  isOpen: boolean;
}

const MenuArrow: React.FC<MenuArrowProps> = ({ isOpen }) => {
  return (
    <div
      style={{
        display: "flex",
        rotate: isOpen ? "-90deg" : "90deg",
        transition: "0.5s",
        transitionDelay: "0.1s",
      }}
    >
      <ChevronRightIcon />
    </div>
  );
};
