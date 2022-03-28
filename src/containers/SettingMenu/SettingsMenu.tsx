import { ThemeModeContext } from "#/themes";
import {
  PaletteMode,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect, useState } from "react";

interface SettingsMenuProps {}

const SettingsMenu: React.FC<SettingsMenuProps> = ({}) => {
  return (
    <Stack padding={2} spacing={2}>
      <Typography fontWeight="bold">Nền</Typography>
      <ThemeToggleButton />
    </Stack>
  );
};

export default SettingsMenu;

const ThemeToggleButton: React.FC = () => {
  const { changeTheme, theme } = useContext(ThemeModeContext);

  // for delaying rendering this until on client side.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <ToggleButtonGroup
      value={theme}
      exclusive
      onChange={(event, value: PaletteMode) => {
        changeTheme(value);
      }}
    >
      <ToggleButton value="light">
        <span style={{ width: 40, textAlign: "center" }}>Sáng</span>
      </ToggleButton>
      <ToggleButton value="dark">
        <span style={{ width: 40, textAlign: "center" }}>Tối</span>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
