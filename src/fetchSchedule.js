export default async function fetchSchedule(date_from, date_to, lang = 'cz') {
  if (!date_from || !date_to) {
    throw new Error("Missing 'from' or 'to' dates");
  }
}