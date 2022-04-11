import { Locale } from "@/api";
import _ from "lodash";

export function getRelativeTimeUntilNow(
  time: Date
): [number, Intl.RelativeTimeFormatUnit] {
  const difference = (Date.now() - time.getTime()) / 1000;
  if (difference < 60) {
    // Less than a minute has passed:
    return [difference, "second"];
  } else if (difference < 3600) {
    // Less than an hour has passed:
    return [Math.floor(difference / 60), "minute"];
  } else if (difference < 86400) {
    // Less than a day has passed:
    return [Math.floor(difference / 3600), "hour"];
  } else if (difference < 2620800) {
    // Less than a month has passed:
    return [Math.floor(difference / 86400), "day"];
  } else if (difference < 31449600) {
    // Less than a year has passed:
    return [Math.floor(difference / 2620800), "month"];
  } else {
    // More than a year has passed:
    return [Math.floor(difference / 31449600), "year"];
  }
}

export function getLocalizedRelativeTime(
  time: Date | string,
  locale: Locale
): string {
  let date: Date;
  if (_.isString(time)) {
    if (!time.endsWith("Z")) {
      date = new Date(time + "Z");
    } else {
      date = new Date(time);
    }
  } else {
    date = time;
  }
  const rtf = new Intl.RelativeTimeFormat(locale, {
    localeMatcher: "best fit",
    numeric: "auto",
    style: "long",
  });

  const [difference, unit] = getRelativeTimeUntilNow(date);

  return rtf.format(-difference, unit);
}
