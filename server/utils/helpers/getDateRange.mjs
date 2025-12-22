export default function getDateRange(period) {
  const now = new Date();
  const start = new Date(now);

  switch (period) {
    case "day":
      start.setHours(0, 0, 0, 0);
      break;

    case "week":
      start.setDate(now.getDate() - 6);
      start.setHours(0, 0, 0, 0);
      break;

    case "month":
      start.setMonth(now.getMonth() - 1);
      break;

    case "year":
      start.setFullYear(now.getFullYear() - 1);
      break;

    default:
      return null;
  }

  return { start, end: now };
}
