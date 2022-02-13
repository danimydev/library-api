function isValidDate(date) {
  if (new Date(date) === 'Invalid Date') {
    return false
  }
  return true;
}

function dbDateFormat(date) {
  return date.toISOString();
}

console.log(isValidDate('invalid'));
console.log(isValidDate('12.02.2022'));