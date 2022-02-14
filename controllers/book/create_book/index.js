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
      const insertableBook = this.#parsetoSnakeCaseObject(book.getInfo());
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
      return {
        statusCode: 500,
        body: {
          error: error,
          method: httpRequest.method,
          path: httpRequest.path,
        }
      }
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

  #parsetoSnakeCaseObject(camalCasedObject) {
    const snakeCaseObject = {};
    const entries = Object.entries(camalCasedObject);
    for (let i = 0; i < entries.length; i++) {
      //[[key, value], [key, value], ... , [key, value]]
      const key = entries[i][0];
      const value = entries[i][1];
      const snakeCaseKey = this.#parseToSnakeCaseString(key);
      snakeCaseObject[snakeCaseKey] = value;
    }
    return snakeCaseObject;
  }

  #parseToSnakeCaseString(str) {
    return str.replace(/[A-Z]/g, letter => {
      return `_${letter.toLowerCase()}`
    });
  }

}

module.exports = {
  CreateBookController,
}