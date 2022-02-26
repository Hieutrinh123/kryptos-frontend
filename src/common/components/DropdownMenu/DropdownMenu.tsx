import Menu, { MenuProps } from "@mui/material/Menu";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { SyntheticEvent, useState } from "react";

type OnClickHandler = (event: SyntheticEvent) => void;

interface DropdownMenuProps extends Omit<MenuProps, "open"> {
  title?: string;
  buttonBuilder?: (onClick: OnClickHandler) => React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  title,
  buttonBuilder,
  children,
  ...rest
}) => {
  const [anchor, setAnchor] = useState<Element | null>(null);
  const handleOpen = (event: SyntheticEvent) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };
  const isOpen = Boolean(anchor);

  let buttonComponent;
  if (buttonBuilder) {
    buttonComponent = buttonBuilder(handleOpen);
  } else {
    buttonComponent = (
      <Button onClick={handleOpen} color="secondary" variant="text">
        {title}
        {isOpen ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
      </Button>
    );
  }
  return (
    <>
      {buttonComponent}
      <Menu {...rest} anchorEl={anchor} open={isOpen} onClose={handleClose}>
        {children}
      </Menu>
    </>
  );
};

export default DropdownMenu;
