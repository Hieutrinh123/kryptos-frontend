import { ThemeModeContext } from "#/themes";
import { getLocaleName } from "#/utils/getLocaleName";
import { PaletteMode } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface SettingsMenuProps {}

const SettingsMenu: React.FC<SettingsMenuProps> = ({}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [, setCookie] = useCookies(["NEXT_LOCALE"]);
  return (
    <Stack padding={2} spacing={2}>
      <Typography fontWeight="bold">{t("Background")}</Typography>
      <ThemeToggleButton />
      <Typography fontWeight="bold">{t("Language")}</Typography>
      <Select
        sx={{ height: 50 }}
        defaultValue={router.locale}
        onChange={(event) => {
          const value = event.target.value;
          if (value) {
            setCookie("NEXT_LOCALE", value);
            return router.replace(
              { pathname: router.pathname, query: router.query },
              router.asPath,
              { locale: value }
            );
          }
        }}
      >
        {router.locales?.map((locale) => (
          <MenuItem value={locale} key={locale}>
            {t(getLocaleName(locale))}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default SettingsMenu;

const ThemeToggleButton: React.FC = () => {
  const { changeTheme, theme } = useContext(ThemeModeContext);
  const { t } = useTranslation();

  // for delaying rendering this until on client side.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <ToggleButtonGroup
        value={theme}
        exclusive
        onChange={(event, value: PaletteMode) => {
          changeTheme(value);
        }}
        sx={{ height: 50 }}
        fullWidth
      >
        <ToggleButton value="light">
          <span style={{ width: 50, textAlign: "center" }}>{t("Light")}</span>
        </ToggleButton>
        <ToggleButton value="dark">
          <span style={{ width: 50, textAlign: "center" }}>{t("Dark")}</span>
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};
