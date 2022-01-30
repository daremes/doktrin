import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import locale_cs from "dayjs/locale/cs";
import locale_en from "dayjs/locale/en";

import { Locale } from "./constants";

const DEFAULT_LOCALE = Locale.cs;

const transformDayNameToShort = (longName: string, locale: Locale) => {
  if (locale === Locale.cs) {
    switch (longName.toLowerCase()) {
      case "pondělí":
        return "po";
      case "úterý":
        return "út";
      case "středa":
        return "st";
      case "čtvrtek":
        return "čt";
      case "pátek":
        return "pá";
      case "sobota":
        return "so";
      case "neděle":
        return "ne";
      default:
        return "";
    }
  }
  if (locale === Locale.en) {
    switch (longName.toLowerCase()) {
      case "monday":
        return "mon";
      case "tuesday":
        return "tue";
      case "wednesday":
        return "wed";
      case "thursday":
        return "thu";
      case "friday":
        return "fri";
      case "saturday":
        return "sat";
      case "sunday":
        return "sun";
      default:
        return "";
    }
  }
};

const transformMonthNameToShort = (longName: string, locale: Locale) => {
  if (locale === Locale.cs) {
    switch (longName.toLowerCase()) {
      case "leden":
        return "led";
      case "únor":
        return "úno";
      case "březen":
        return "bře";
      case "duben":
        return "dub";
      case "květen":
        return "kvě";
      case "červen":
        return "čvn";
      case "červenec":
        return "čvc";
      case "srpen":
        return "srp";
      case "září":
        return "zář";
      case "říjen":
        return "říj";
      case "listopad":
        return "lis";
      case "prosinec":
        return "pro";
      default:
        return "";
    }
  }
  if (locale === Locale.en) {
    switch (longName.toLowerCase()) {
      case "january":
        return "jan";
      case "february":
        return "feb";
      case "march":
        return "mar";
      case "april":
        return "apr";
      case "may":
        return "may";
      case "june":
        return "jun";
      case "july":
        return "jul";
      case "august":
        return "aug";
      case "september":
        return "sep";
      case "october":
        return "oct";
      case "november":
        return "nov";
      case "december":
        return "dec";
      default:
        return "";
    }
  }
};

dayjs.extend(localeData);
dayjs.extend(weekday);

export const transformDate = (date: Date | string, locale?: Locale) => {
  const currentLocale = locale || DEFAULT_LOCALE;
  const currentLocalization =
    currentLocale === Locale.cs ? locale_cs : locale_en;

  dayjs.locale(currentLocalization);

  const toDayJs = dayjs(date);
  const weekdayNames = toDayJs.localeData().weekdays();
  const dayIndex = toDayJs.day();

  const monthNames = toDayJs.localeData().months();
  const monthIndex = toDayJs.month();

  const longMonthDay = monthNames[monthIndex];
  const shortMonthName = transformMonthNameToShort(longMonthDay, currentLocale);
  const longDayName = weekdayNames[dayIndex];
  const shortDayName = transformDayNameToShort(longDayName, currentLocale);
  const day = toDayJs.date();
  const formatedDate = toDayJs.format("DD.MM.YYYY");
  const formatedTime = toDayJs.format("HH:mm");
  const formatedDateTime = toDayJs.format("DD.MM.YYYY HH:mm");

  return {
    longDayName,
    shortDayName,
    longMonthDay,
    shortMonthName,
    day,
    formatedDate,
    formatedTime,
    formatedDateTime,
    asDayJs: toDayJs,
  };
};
