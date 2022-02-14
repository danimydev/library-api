class UpdateBookController {

  #ormAdapter;
  #schemaValidator;

  constructor({ ormAdapter, schemaValidator }) {
    this.#ormAdapter = ormAdapter;
    this.#schemaValidator = schemaValidator;
  }

  async execute(httpRequest) {
    try {
      const { body: values, params: { id } } = httpRequest;
      this.#validateValues({ values: { ...values, id } });
      const updateableValues = this.#parsetoSnakeCaseObject(values);
      const updatedBook = await this.#orm({ key: id, values: updateableValues });
      return {
        statusCode: 200,
        body: {
          updatedBook,
          method: httpRequest.method,
          path: httpRequest.path,
        }
      };
    } catch (error) {
      throw error;
    }
  }

  #validateValues({ values }) {
    try {
      const isValid = this.#schemaValidator.validate({
        schemaKey: 'updateBook',
        data: values,
      });
      if (!isValid) {
        throw new Error('invalid schema passed');
      }
    } catch (error) {
      throw new Error('error validating on update book controller');
    }
  }

  async #orm({ key, values }) {
    try {
      const book = await this.#ormAdapter.updateRecord({
        table: 'book',
        id: key,
        values,
      });
      return book;
    } catch (error) {
      throw new Error('error updating book');
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
  UpdateBookController,
}