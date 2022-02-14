const { bookFactory } = require('../../entities/book');
const { knexAdapter } = require('../../database/adapters');
const { ajvValidator } = require('../../utils/schema_validator');
const { GetBooksController } = require('./get_books');
const { CreateBookController } = require('./create_book');
const { DeleteBookController } = require('./delete_book');
const { UpdateBookController } = require('./update_book');

//Register Validators -- Move this!
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
  key: 'createBook',
  schema: createBookSchema,
});

ajvValidator.registerValidator({
  key: 'updateBook',
  schema: updateBookSchema,
});


const getBooksController = new GetBooksController({
  ormAdapter: knexAdapter,
});

const createBookController = new CreateBookController({
  ormAdapter: knexAdapter,
  schemaValidator: ajvValidator,
  factory: bookFactory,
});

const deleteBookController = new DeleteBookController({
  ormAdapter: knexAdapter,
});

const updateBookController = new UpdateBookController({
  ormAdapter: knexAdapter,
  schemaValidator: ajvValidator,
});


module.exports = {
  getBooksController,
  createBookController,
  updateBookController,
  deleteBookController,
}