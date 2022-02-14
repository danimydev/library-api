const { GetBooksController } = require('./index');
const { knexAdapter } = require('../../../database/adapters');

describe('get books controller with knex orm adapter', () => {

  const getBookController = new GetBooksController({
    ormAdapter: knexAdapter,
  });

  test('should returns an array of book objects', async () => {
    const httpRequest = {
      body: {},
      query: {},
      params: {},
      ip: null,
      method: 'GET',
      path: '/books',
    }
    const httpResponse = await getBookController.execute(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
  });

});