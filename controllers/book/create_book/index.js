class CreateBookController {

  #ormAdapter;
  #schemaValidator;
  #factory;

  constructor({ ormAdapter, schemaValidator, factory }) {
    this.#ormAdapter = ormAdapter;
    this.#schemaValidator = schemaValidator;
    this.#factory = factory;
  }

  async execute(httpRequest) {
    try {
      const { body } = httpRequest;
      this.#validateValues({ values: body });
      const book = this.#getFromFactory({ values: body });
      const insertableBook = this.entityBookToDBRecord(book);
      const createdBook = await this.#orm({ values: insertableBook });
      return {
        statusCode: 201,
        body: {
          createdBook,
          method: httpRequest.method,
          path: httpRequest.path,
        }
      };
    } catch (error) {
      throw error;
    }
  }

  #getFromFactory({ values }) {
    try {
      const book = this.#factory.createBook(values);
      return book;
    } catch (error) {
      throw new Error('error creating book on factory');
    }
  }

  #validateValues({ values }) {
    try {
      const isValid = this.#schemaValidator.validate({
        schemaKey: 'createBook',
        data: values,
      });
      if (!isValid) {
        throw new Error('invalid schema passed');
      }
    } catch (error) {
      throw new Error('error validating on create book controller');
    }
  }

  async #orm({ values }) {
    try {
      const book = await this.#ormAdapter.insertRecord({
        table: 'book',
        values,
      });
      return book;
    } catch (error) {
      throw new Error('error inserting book');
    }
  }

  //TODO - Probably move to constructor as dependency injection
  entityBookToDBRecord(book) {
    const bookInfo = book.getInfo();
    return {
      id: bookInfo.id,
      title: bookInfo.title,
      author_id: bookInfo.authorId,
      published_date: bookInfo.publishedDate,
      category: bookInfo.category,
      isbn: bookInfo.isbn,
    };
  }

}

module.exports = {
  CreateBookController,
}