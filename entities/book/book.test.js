const { BookFactory } = require('./factory');
const { Book } = require('./book');
const { md5 } = require('../../utils/id_generator');
const { isValidDate } = require('../../utils/date_validator');

const bookFactory = new BookFactory({
  Book,
  generateId: md5,
  isValidDate,
});

describe('create book behaviour', () => {

  test('book info should match params on creation', async () => {

    const book = bookFactory.createBook({
      title: 'book 1',
      author: 'author 1',
      publishedDate: '12-02-2022',
      isbn: 'isbn 1',
    });

    expect(book.getInfo()).toEqual({
      id: '6a77e35dc5b10c68d4db523ff5a68b5c',
      title: 'book 1',
      author: 'author 1',
      publishedDate: '12-02-2022',
      isbn: 'isbn 1'
    });
    expect(book.id).toBe('6a77e35dc5b10c68d4db523ff5a68b5c');
  });

  /* test('book id should be 593210d2ffcf3f04be0cf36f25877cdb', async () => {
      expect(book.id).toBe('593210d2ffcf3f04be0cf36f25877cdb');
  }); */

  test('should throw error', async () => {
    try {
      bookFactory.createBook({
        title: '',
        author: 'author 2',
        isbn: '123',
      });
    } catch (error) {
      expect(error.message).toBe('error creating book, empty values passed!');
    }
  });

});