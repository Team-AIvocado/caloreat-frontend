export function getToday() {
  return new Intl.DateTimeFormat("sv-SE").format(new Date());
}
