import { getTime, formatDistanceToNow, format } from "date-fns";
import { faIR } from "date-fns/locale";

// ----------------------------------------------------------------------

const options = { locale: faIR };

export function fDate(date, newFormat) {
  const fm = newFormat || "d MMMM yyyy";

  return date ? format(new Date(date), fm, options) : "";
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || "d MMMM yyyy p";

  return date ? format(new Date(date), fm) : "";
}

export function fChartDateTime(date, newFormat) {
  const fm = newFormat || "yyyy/MM/dd HH:mm";

  return date ? format(new Date(date), fm) : "";
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : "";
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: faIR,
      })
    : "";
}
