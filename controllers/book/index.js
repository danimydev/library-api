const { bookFactory } = require('../../entities/book');
const { knexAdapter } = require('../../database/adapters');
const { ajvValidator } = require('../../utils/schema_validator');
const { GetBooksController } = require('./get_books');
const { CreateBookController } = require('./create_book');
const { DeleteBookController } = require('./delete_book');

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

async function getBooks(httpRequest) {
  const books = await knexAdapter.selectRecord({
    table: 'book',
    values: {},
  });
  return {
    statusCode: 200,
    body: {
      books,
      method: httpRequest.method,
      path: httpRequest.path,
    }
  }
}

async function getBookById(httpRequest) {
  const { id } = httpRequest.params || {};
  if (!id) {
    return {
      statusCode: 500,
      body: {
        error: 'no id passed!',
      },
    }
  }
  const book = await knexAdapter.selectRecord({
    table: 'book',
    values: {
      id,
    },
  });
  return {
    statusCode: 200,
    body: {
      book,
      method: httpRequest.method,
      path: httpRequest.path,
    }
  }
}

async function postBook(httpRequest) {

  //TODO move this to initialization of validator
  const factoryBookSchema = {
    type: 'object',
    properties: {
      title: { type: 'string' },
      authorId: { type: 'string' },
      publishedDate: { type: 'string' },
      category: { type: 'string' },
      isbn: { type: 'string' },
    },
    required: ["title", "authorId", "publishedDate", "category", "isbn"],
    additionalProperties: false
  }
  ajvValidator.registerValidator({
    key: 'factorybook',
    schema: factoryBookSchema,
  });
  const isValidToCreate = ajvValidator.validate({
    schemaKey: 'factorybook',
    data: httpRequest.body,
  });

  if (!isValidToCreate) {
    return {
      statusCode: 500,
      body: {
        error: 'invalid body, cannot create book',
        invalid: httpRequest.body,
      }
    }
  }

  const {
    title,
    authorId,
    publishedDate,
    category,
    isbn,
  } = httpRequest.body;
  const factoryBook = bookFactory.createBook({
    title,
    authorId,
    publishedDate,
    category,
    isbn,
  });

  const book = factoryBook.getInfo();
  const values = {
    id: book.id,
    title: book.title,
    author_id: book.authorId,
    published_date: book.publishedDate,
    category: book.category,
    isbn: book.isbn,
  }

  const dbBook = await knexAdapter.insertRecord({
    table: 'book',
    values,
  });

  return {
    statusCode: 201,
    body: {
      book: dbBook,
      method: httpRequest.method,
      path: httpRequest.path,
    }
  }

}

async function deleteBookById(httpRequest) {

  const { id } = httpRequest.params || {};

  if (!id) {
    return {
      statusCode: 500,
      body: {
        error: 'no id passed!',
      },
    }
  }

  await knexAdapter.deleteRecord({
    table: 'book',
    values: {
      id,
    },
  });

  return {
    statusCode: 200,
    body: {
      msg: 'deleted',
    },
  }

}

module.exports = {
  getBooks,
  getBookById,
  postBook,
  deleteBookById,
  getBooksExecute: getBooksController.execute,
  createBookExecute: createBookController.execute,
  deleteBookExecute: deleteBookController.execute,
}