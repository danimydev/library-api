const { md5 } = require('./id_generator');

describe('id generators units', () => {

  test('md5 hash length should be 32', () => {
    expect(md5('test').length).toBe(32);
  });

  test('md5 hash length should be 32', () => {
    expect(md5({ test: 'test' }).length).toBe(32);
  });

});