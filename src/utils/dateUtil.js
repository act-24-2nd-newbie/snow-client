/** @param {number} n  */
function padNumber(n) {
  return `${n}`.padStart(2, '0');
}

/** @param {number} dateInMillisecond  */
export function getDateString(dateInMillisecond) {
  const d = new Date(dateInMillisecond * 1000);
  const month = padNumber(d.getMonth() + 1);
  const day = padNumber(d.getDate());
  const hour = padNumber(d.getHours());
  const min = padNumber(d.getMinutes());

  return `${month}/${day} ${hour}:${min}`;
}

export function getWelcomeMessage() {
  const h = new Date().getHours();

  if (h >= 7 && h < 12) {
    return 'Good morning';
  } else if (h >= 12 && h < 18) {
    return 'Good afternoon';
  } else if (h >= 18 && h < 22) {
    return 'Good evening';
  } else {
    return 'Good night';
  }
}
