export const apiUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_URL
    : process.env.REACT_APP_API_URL_PRODUCTION;

export function formatHour(hour) {
  return ("0" + hour.toString() + ":00").slice(-5);
}
