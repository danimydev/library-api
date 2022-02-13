const { BookFactory } = require('./factory');
const { Book } = require('./book');
const { md5 } = require('../../utils/id_generator');

const bookFactory = new BookFactory({
  Book,
  generateId: md5,
});

describe('create book behaviour', () => {

  test('book info should match params on creation', async () => {

    const book = bookFactory.createBook({
      title: 'book 1',
      author: 'author 1',
      isbn: 'isbn 1',
    });

    expect(book.getInfo()).toEqual({
      id: '593210d2ffcf3f04be0cf36f25877cdb',
      title: 'book 1',
      author: 'author 1',
      isbn: 'isbn 1'
    });
    expect(book.id).toBe('593210d2ffcf3f04be0cf36f25877cdb');
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