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


export function validateEmail(rule, value, callback) {
  const emailRge = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!emailRge.test(value)) {
    callback(new Error('邮箱格式不正确'));
  } else {
    callback();
  }
};