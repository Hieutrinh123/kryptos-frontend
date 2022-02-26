import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  PopperProps,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  bindPopper,
  bindToggle,
  usePopupState,
} from "material-ui-popup-state/hooks";
import React, { SyntheticEvent } from "react";

interface ButtonProps {
  "aria-controls"?: string;
  "aria-describedby"?: string;
  "aria-haspopup": true | undefined;
  onClick: (event: SyntheticEvent<any>) => void;
}

interface DropdownMenuProps extends Omit<PopperProps, "open"> {
  title?: string;
  buttonBuilder?: (
    buttonProps: ButtonProps,
    isOpen?: boolean
  ) => React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  title,
  buttonBuilder,
  children,
  ...rest
}) => {
  const popupState = usePopupState({
    variant: "popper",
    popupId: "demoPopper",
  });

  const isOpen = popupState.isOpen;

  let buttonComponent;
  if (buttonBuilder) {
    buttonComponent = buttonBuilder(bindToggle(popupState), isOpen);
  } else {
    buttonComponent = (
      <Button variant="text" color="secondary" {...bindToggle(popupState)}>
        <Box marginRight={1}>{title}</Box>
        <MenuArrow isOpen={isOpen} />
      </Button>
    );
  }
  return (
    <>
      {buttonComponent}
      <Popper
        {...bindPopper(popupState)}
        transition
        style={{ zIndex: 1300 }}
        {...rest}
      >
        {({ TransitionProps, placement }) => (
          <ClickAwayListener onClickAway={popupState.close}>
            <Grow
              {...TransitionProps}
              style={{
                transition: "0.1s",
                transformOrigin: placement.includes("bottom")
                  ? "left top"
                  : "left bottom",
              }}
            >
              <Paper>
                <>{children}</>
              </Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
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
