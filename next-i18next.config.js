const path = require("path");
module.exports = {
  i18n: {
    defaultLocale: "vi",
    locales: ["en", "vi"],
    localePath: path.resolve("./public/locales"),
  },
  reloadOnPrerender: true,
  fallbackLng: "en",
  saveMissing: true,
  react: { useSuspense: false },
};
