import { ThemeModeContext } from "#/themes";
import DropdownMenu from "@/components/DropdownMenu";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  PaletteMode,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Select, { Option } from "@/components/Select";
import Typography from "@mui/material/Typography";
import React, { useContext, useState } from "react";

interface SettingMenuProps {}

const SettingMenu: React.FC<SettingMenuProps> = ({}) => {
  const { changeTheme, theme } = useContext(ThemeModeContext);
  const [font, setFont] = useState("Roboto");
  return (
    <DropdownMenu
      buttonBuilder={(buttonProps) => (
        <IconButton color="primary" {...buttonProps}>
          <SettingsIcon />
        </IconButton>
      )}
      offsetX={0}
      offsetY={20}
    >
      <Stack padding={2} spacing={2}>
        <Typography fontWeight="bold">Nền</Typography>
        <ToggleButtonGroup
          value={theme}
          exclusive
          onChange={(event, value: PaletteMode) => {
            changeTheme(value);
          }}
        >
          <ToggleButton value="light">
            <span>Light</span>
          </ToggleButton>
          <ToggleButton value="dark">
            <span>Dark</span>
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography fontWeight="bold">Font chữ</Typography>
        <Select
          value={font}
          onChange={(value) => {
            if (value) {
              setFont(value);
            }
          }}
        >
          <Option value="Roboto">Roboto</Option>
          <Option value="Arial">Arial</Option>
        </Select>
      </Stack>
    </DropdownMenu>
  );
};

export default SettingMenu;
