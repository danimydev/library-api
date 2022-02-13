const { Author } = require('./author');
const { AuthorFactory } = require('./factory');
const { md5 } = require('../../utils/id_generator');
const { isValidDate } = require('../../utils/date_validator');

const authorFactory = new AuthorFactory({
  Author,
  generateId: md5,
  isValidDate,
});

describe('author entity behaviour', () => {

  test('author info should match params on creation', () => {
    const a = authorFactory.createAuthor({
      name: 'author 1',
      surname: 'surname 1',
      birthDate: '12.12.1990',
      deathDate: '12.12.2022'
    });
    expect(a.getInfo()).toEqual({
      id: 'ec0d6ba5e3291d195c30c0fe8832fe1a',
      name: 'author 1',
      surname: 'surname 1',
      birthDate: '12.12.1990',
      deathDate: '12.12.2022'
    });
  });

  test('author info should match params on creation without surname or deathBirthday', () => {
    const a = authorFactory.createAuthor({
      name: 'author 1',
      surname: '',
      birthDate: '12.12.1990',
      deathDate: ' '
    });
    expect(a.getInfo()).toEqual({
      id: 'ec0d6ba5e3291d195c30c0fe8832fe1a',
      name: 'author 1',
      surname: '',
      birthDate: '12.12.1990',
      deathDate: ' '
    });
  });

  test('should throw error when missing name or birthDate on creation', () => {
    try {
      const a = authorFactory.createAuthor({
        name: '  ',
        surname: 'surname 1',
        birthDate: '12.12.1990',
        deathDate: '12.12.2022'
      });
    } catch (error) {
      expect(error.message).toEqual('name and birthDate must be provided!');
    }
  });

  test('should throw error when invalid birthDate is passed on creation', () => {
    try {
      const a = authorFactory.createAuthor({
        name: 'name 1',
        surname: 'surname 1',
        birthDate: '12.12.190',
        deathDate: '12.12.2022'
      });
    } catch (error) {
      expect(error.message).toEqual('invalid birthDate!');
    }
  });

  test('should throw error when invalid deathDate is passed on creation', () => {
    try {
      const a = authorFactory.createAuthor({
        name: 'name 1',
        surname: 'surname 1',
        birthDate: '12.12.1990',
        deathDate: '12.12.202'
      });
    } catch (error) {
      expect(error.message).toEqual('invalid deathDate!');
    }
  });

});