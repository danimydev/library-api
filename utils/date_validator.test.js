const { isValidDate, getISODate } = require('./date_validator');

describe('isValidDate and getISODate behaviour', () => {

  test('should return true when date is valid', () => {
    const validDate = '12/12/2002';
    const isValid = isValidDate(validDate);
    expect(isValid).toBe(true);
  });

  test('should return true when date is valid', () => {
    const validDate = '12.12.2002';
    const isValid = isValidDate(validDate);
    expect(isValid).toBe(true);
  });

  test('should return true when date is valid', () => {
    const dateString = new Date('12/12/2012').toDateString();
    const isValid = isValidDate(dateString);
    expect(isValid).toBe(true);
  });

  test('should return true when date is valid', () => {
    const isoString = new Date('12/12/2012').toISOString();
    const isValid = isValidDate(isoString);
    expect(isValid).toBe(true);
  });

  test('should return false when date is invalid', () => {
    const invalidDate = '12/12/200';
    const isValid = isValidDate(invalidDate);
    expect(isValid).toBe(false);
  });

  test('should return ISO Date String', () => {
    const isoDate = getISODate('12/12/2012');
    expect(isoDate).toBe(new Date('12/12/2012').toISOString());
  });

  test('should return invalid when passing wrong format', () => {
    const isoDate = getISODate('12/12/201');
    expect(isoDate).toBe('invalid');
  });

});