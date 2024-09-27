function padNumber(n) {
  return `${n}`.padStart(2, '0');
}

export function getDateString(date) {
  const d = new Date(date * 1000);
  const month = padNumber(d.getMonth() + 1);
  const day = padNumber(d.getDate());
  const hour = padNumber(d.getHours());
  const min = padNumber(d.getMinutes());

  return `${month}/${day} ${hour}:${min}`;
}
