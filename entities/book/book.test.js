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
      category: 'category 1',
      isbn: 'isbn 1',
    });

    expect(book.getInfo()).toEqual({
      id: '593210d2ffcf3f04be0cf36f25877cdb',
      title: 'book 1',
      author: 'author 1',
      publishedDate: '12-02-2022',
      category: 'category 1',
      isbn: 'isbn 1'
    });
  });



  test('should throw error when missing title on creation', async () => {
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

  test('should throw error when set book title to null or empty', () => {
    try {
      const book = bookFactory.createBook({
        title: 'book 1',
        author: 'author 1',
        publishedDate: '12-02-2022',
        category: 'category 1',
        isbn: 'isbn 1',
      });
      book.title = '';
    } catch (error) {
      expect(error.message).toBe('cannot set null title');
    }
  });

});