const { UpdateBookController } = require('./index');
const { knexAdapter } = require('../../../database/adapters');
const { ajvValidator } = require('../../../utils/schema_validator');

describe('update book controller with knex orm adapter and ajv validator', () => {

  test('should returns an updated book', async () => {

    const updateBookSchema = {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        authorId: { type: 'string' },
        publishedDate: { type: 'string' },
        category: { type: 'string' },
        isbn: { type: 'string' }
      },
      required: ["id"],
      additionalProperties: false,
    }

    ajvValidator.registerValidator({
      key: 'updateBook',
      schema: updateBookSchema,
    });

    const updateBookController = new UpdateBookController({
      ormAdapter: knexAdapter,
      schemaValidator: ajvValidator,
    });

    const httpRequest = {
      body: {
        title: 'title 1',
        authorId: '1',
        publishedDate: '12/12/2002',
        category: 'category 1',
        isbn: '123456',
      },
      query: {},
      params: {
        id: 'a0c6242cf1375cada95845c90531fa60'
      },
      ip: null,
      method: 'PATCH',
      path: '/books/a0c6242cf1375cada95845c90531fa60',
    }

    const { body: values, params: { id } } = httpRequest;

    const httpResponse = await updateBookController.execute(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
  });

});