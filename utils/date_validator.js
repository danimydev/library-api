function isValidDate(date) {
  if (date.length < 10) {
    return false;
  }
  return new Date(date).toString() !== 'Invalid Date';
}

function getISODate(date) {
  const d = new Date(date);
  return d.toISOString();
}

module.exports = {
  isValidDate,
  getISODate,
}