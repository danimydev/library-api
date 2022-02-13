function isValidDate(date) {
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