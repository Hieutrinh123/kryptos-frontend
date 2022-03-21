import { grey } from "@/common/styles/colors";
import { OptionUnstyled, optionUnstyledClasses } from "@mui/base";
import SelectUnstyled, {
  selectUnstyledClasses,
  SelectUnstyledProps,
} from "@mui/base/SelectUnstyled";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { darken } from "@mui/material";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import * as React from "react";

const StyledButton = styled("button")(
  ({ theme }) => `
  background: ${theme.palette.background.default};
  border: none;
  border-radius: 24px;
  padding: ${theme.spacing(1, 2)};
  text-align: center;
  line-height: 1.5;

  &:hover {
    background: ${darken(theme.palette.background.default, 0.1)};
  }

  &.${selectUnstyledClasses.expanded} {
    & .SelectArrow {
      transform: rotate(-180deg);
    }
  }

  & .SelectArrow {
    transition: 0.5s;
  }
  `
);

const RootElement = React.forwardRef<HTMLButtonElement>((props, ref) => {
  return (
    <StyledButton {...props} ref={ref}>
      <Stack direction="row" alignItems="center">
        <KeyboardArrowDown visibility="hidden" />
        <Box flexGrow={1}>{props.children}</Box>
        <KeyboardArrowDown className="SelectArrow" />
      </Stack>
    </StyledButton>
  );
});
RootElement.displayName = "SelectRoot";

const StyledListbox = styled("ul")(
  ({ theme }) => `
  min-width: 200px;
  font-size: 0.875rem;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
  border-radius: 0.75em;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  `
);

export const Option = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  cursor: default;
  text-align: center;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${darken(theme.palette.background.default, 0.1)};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${darken(theme.palette.background.default, 0.2)};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${darken(theme.palette.background.default, 0.3)};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${darken(theme.palette.background.default, 0.4)};
  }
  `
);

export default function CustomSelect(props: SelectUnstyledProps<string>) {
  const components: SelectUnstyledProps<string>["components"] = {
    Root: RootElement,
    Listbox: StyledListbox,
    Popper: (popperProps) => {
      return (
        <Popper
          {...popperProps}
          placement="bottom"
          disablePortal
          modifiers={[
            {
              name: "flip",
              enabled: false,
            },
          ]}
        />
      );
    },
    ...props.components,
  };

  return <SelectUnstyled {...props} components={components} />;
}
