const { CreateBookController } = require('./index');
const { knexAdapter } = require('../../../database/adapters');
const { ajvValidator } = require('../../../utils/schema_validator');
const { bookFactory } = require('../../../entities/book');

describe('create book controller with knex orm adapter and ajv validator', () => {

  test('should returns an array with one created book', async () => {

    const createBookSchema = {
      type: 'object',
      properties: {
        title: { type: 'string' },
        authorId: { type: 'string' },
        publishedDate: { type: 'string' },
        category: { type: 'string' },
        isbn: { type: 'string' }
      },
      required: ["title", "authorId", "publishedDate", "category", "isbn"],
      additionalProperties: false,
    }

    ajvValidator.registerValidator({
      key: 'createBook',
      schema: createBookSchema,
    });

    const createBookController = new CreateBookController({
      ormAdapter: knexAdapter,
      schemaValidator: ajvValidator,
      factory: bookFactory,
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
      params: {},
      ip: null,
      method: 'POST',
      path: '/books',
    }

    const httpResponse = await createBookController.execute(httpRequest);

    //remove created book
    await knexAdapter.deleteRecord({
      table: 'book',
      values: {
        id: 'a0c6242cf1375cada95845c90531fa60',
        title: 'title 1',
        author_id: '1',
        published_date: '2002-12-12T05:00:00.000Z',
        category: 'category 1',
        isbn: '123456'
      },
    });

    expect(httpResponse.statusCode).toBe(201);
  });

});