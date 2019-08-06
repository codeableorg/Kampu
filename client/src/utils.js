export const apiUrl =
  process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export function formatHour(hour) {
  return ("0" + hour.toString() + ":00").slice(-5);
}
