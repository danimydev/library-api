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
      authorId: 'author 1',
      publishedDate: '12-02-2022',
      category: 'category 1',
      isbn: 'isbn 1',
    });

    expect(book.getInfo()).toEqual({
      id: 'ad88a73e5ebe79e715f1a273d22819b3',
      title: 'book 1',
      authorId: 'author 1',
      publishedDate: '2022-12-02T05:00:00.000Z',
      category: 'category 1',
      isbn: 'isbn 1'
    });
  });



  test('should throw error when missing title on creation', async () => {
    try {
      bookFactory.createBook({
        title: '',
        authorId: 'author 2',
        isbn: '123',
      });
    } catch (error) {
      expect(error.message).toBe('error creating book, empty values passed!');
    }
  });

  /* test('should throw error when set book title to null or empty', () => {
    try {
      const book = bookFactory.createBook({
        title: 'book 1',
        authorId: 'author 1',
        publishedDate: '12-02-2022',
        category: 'category 1',
        isbn: 'isbn 1',
      });
      book.title = '';
    } catch (error) {
      expect(error.message).toBe('cannot set null title');
    }
  }); */

});