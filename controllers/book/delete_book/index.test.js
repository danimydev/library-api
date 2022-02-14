const { DeleteBookController } = require('./index');
const { knexAdapter } = require('../../../database/adapters');

describe('delete book controller with knex orm adapter and ajv validator', () => {

  const deleteBookController = new DeleteBookController({
    ormAdapter: knexAdapter,
  });

  test('should returns 200 when deleting record', async () => {

    const httpRequest = {
      body: {},
      query: {},
      params: {
        id: '1'
      },
      ip: null,
      method: 'GET',
      path: '/books',
    }

    const httpResponse = await deleteBookController.execute(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
  });

});