import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  PopperPlacementType,
  PopperProps,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  bindPopper,
  bindToggle,
  usePopupState,
} from "material-ui-popup-state/hooks";
import React, { SyntheticEvent, useEffect, useRef } from "react";

interface ButtonProps {
  "aria-controls"?: string;
  "aria-describedby"?: string;
  "aria-haspopup": true | undefined;
  onClick: (event: SyntheticEvent<any>) => void;
  ref: React.Ref<HTMLButtonElement>;
}

interface DropdownMenuProps extends Omit<PopperProps, "open"> {
  title?: string;
  buttonBuilder?: (
    buttonProps: ButtonProps,
    isOpen?: boolean
  ) => React.ReactNode;
  placement?: PopperPlacementType;
  offsetX?: number;
  offsetY?: number;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  title,
  buttonBuilder,
  children,
  placement,
  offsetX,
  offsetY,
  ...rest
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popupState = usePopupState({
    variant: "popper",
    popupId: "dropDownMenu",
  });

  const isOpen = popupState.isOpen;
  useEffect(() => {
    if (!isOpen) {
      buttonRef.current?.blur();
    }
  }, [buttonRef, isOpen]);

  let buttonComponent;
  if (buttonBuilder) {
    buttonComponent = buttonBuilder(
      { ref: buttonRef, ...bindToggle(popupState) },
      isOpen
    );
  } else {
    buttonComponent = (
      <Button
        variant="text"
        color="secondary"
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
      <Popper
        {...bindPopper(popupState)}
        transition
        placement={placement ?? "bottom-start"}
        modifiers={[
          {
            name: "offset",
            options: { offset: [offsetX ?? -20, offsetY ?? 0] },
          },
        ]}
        style={{ zIndex: 1300 }}
        {...rest}
      >
        {({ TransitionProps, placement }) => (
          <ClickAwayListener onClickAway={popupState.close}>
            <Grow
              {...TransitionProps}
              style={{
                transition: "0.1s",
                transformOrigin: placement.includes("top") ? "bottom" : "top",
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
