export function getLocaleName(locale: string): string {
  if (locale === "en") {
    return "English";
  }
  if (locale === "vi") {
    return "Vietnamese";
  }
  return "All";
}

export function getLocaleIcon(locale: string): string {
  if (locale === "en") {
    return "🇬🇧";
  }
  if (locale === "vi") {
    return "🇻🇳";
  }
  return "";
}
