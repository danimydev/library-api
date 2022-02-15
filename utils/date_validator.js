function isValidDate(date) {
  if (date.length < 10) {
    return false;
  }
  return new Date(date).toString() !== 'Invalid Date';
}

function getISODate(date) {
  return isoDate = isValidDate(date)
    ? new Date(date).toISOString()
    : 'invalid';
}

module.exports = {
  isValidDate,
  getISODate,
}