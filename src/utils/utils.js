export function tranformDate(startDay, endDay) {
  let start = new Date(startDay);
  let end = new Date(endDay);
  return (
    start.getFullYear() +
    "." +
    start.getMonth() +
    "." +
    start.getDay() +
    "-" +
    end.getFullYear() +
    "." +
    end.getMonth() +
    "." +
    end.getDay()
  );
}
