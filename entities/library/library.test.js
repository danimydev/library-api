const { Library } = require('./library');
const { LibraryFactory } = require('./factory');
const { md5 } = require('../../utils/id_generator');

const libraryFactory = new LibraryFactory({
  Library,
  generateId: md5,
});

describe('library entity behaviour', () => {
  test('should create a new library with name library 1', () => {
    const l = libraryFactory.createLibrary({
      name: 'library 1',
      address: 'address test',
      cityId: '123',
    });
    expect(l.getInfo()).toEqual({
      id: '10190afb3610072805882492cd1ca9b9',
      name: 'library 1',
      address: 'address test',
      cityId: '123'
    });
  });
  test('should throw error on creating library without name', () => {
    try {
      const l = libraryFactory.createLibrary({
        name: '',
        address: 'address test',
        cityId: '123',
      });
    } catch (error) {
      expect(error.message).toBe('error creating library, empty values passed!');
    }
  });
});