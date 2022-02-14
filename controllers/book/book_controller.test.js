const { getBooks, getBookById, postBook, deleteBookById, getBooksExecute } = require('./index');

describe('book controller behaviour', () => {

  test('should return 200 when getting all Books', async () => {

    const httpRequest = {
      body: {},
      query: {},
      params: {},
      ip: null,
      method: 'GET',
      path: '/books',
    }

    const response = await getBooks(httpRequest);
    expect(response.statusCode).toBe(200);
  });

  test('should return 200 for getting a book by id', async () => {

    const httpRequest = {
      body: {},
      query: {},
      params: {
        id: '1',
      },
      ip: null,
      method: 'GET',
      path: '/books',
    }

    const response = await getBooks(httpRequest);
    expect(response.statusCode).toBe(200);
  });

  test('should return 500 when missing id on getBookById', async () => {

    const httpRequest = {
      body: {},
      query: {},
      params: {},
      ip: null,
      method: 'GET',
      path: '/books',
    }
    const response = await getBookById(httpRequest);
    expect(response.statusCode).toBe(500);
  });

  test('should return 201 on postBook with valid body', async () => {

    const httpRequest = {
      body: {
        title: 'book 1',
        authorId: '1',
        publishedDate: '12/12/2012',
        category: 'category 1',
        isbn: '123456',

      },
      query: null,
      params: null,
      ip: null,
      method: 'POST',
      path: '/books',
    }
    const response = await postBook(httpRequest);

    expect(response.body.book).toEqual({
      id: 'b2ceb86576f1a2cc7f4d4d4718924710',
      title: 'book 1',
      author_id: '1',
      published_date: '2012-12-12T05:00:00.000Z',
      category: 'category 1',
      isbn: '123456'
    });
  });

  test('should return 200 for deleting a book by id', async () => {

    const httpRequest = {
      body: {},
      query: {},
      params: {
        id: 'b2ceb86576f1a2cc7f4d4d4718924710',
      },
      ip: null,
      method: 'DELETE',
      path: '/books',
    }

    const response = await deleteBookById(httpRequest);
    expect(response.statusCode).toBe(200);
  });

});