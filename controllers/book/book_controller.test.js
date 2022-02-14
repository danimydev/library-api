const {
  getBooksController,
  createBookController,
  updateBookController,
  deleteBookController } = require('./index');

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

    const response = await getBooksController.execute(httpRequest);
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

    const response = await getBooksController.execute(httpRequest);
    expect(response.statusCode).toBe(200);
  });

  test('should return 200 when missing id on getBookById', async () => {

    const httpRequest = {
      body: {},
      query: {},
      params: {},
      ip: null,
      method: 'GET',
      path: '/books',
    }
    const response = await getBooksController.execute(httpRequest);
    expect(response.statusCode).toBe(200);
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
    const httpResponse = await createBookController.execute(httpRequest);

    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body.createdBook).toEqual({
      id: 'b2ceb86576f1a2cc7f4d4d4718924710',
      title: 'book 1',
      author_id: '1',
      published_date: '2012-12-12T05:00:00.000Z',
      category: 'category 1',
      isbn: '123456'
    });
  });

  test('should return 200 when updating a book with valid body', async () => {

    const httpRequest = {
      body: {
        title: 'book 1',
        authorId: '2',
        publishedDate: '12/12/2012',
        category: 'category 1',
        isbn: '123456',
      },
      query: null,
      params: {
        id: 'b2ceb86576f1a2cc7f4d4d4718924710',
      },
      ip: null,
      method: 'POST',
      path: '/books',
    }
    const httpResponse = await updateBookController.execute(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body.updatedBook).toEqual({
      id: 'b2ceb86576f1a2cc7f4d4d4718924710',
      title: 'book 1',
      author_id: '2',
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

    const response = await deleteBookController.execute(httpRequest);
    expect(response.statusCode).toBe(200);
  });

});