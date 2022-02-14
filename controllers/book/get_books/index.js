class GetBooksController {

  #ormAdapter;

  constructor({ ormAdapter }) {
    this.#ormAdapter = ormAdapter;
  }

  async execute(httpRequest) {
    try {
      const { id } = httpRequest.params;
      const books = id
        ? await this.#orm({ values: { id } })
        : await this.#orm({ values: {} });
      return {
        statusCode: 200,
        body: {
          books,
          method: httpRequest.method,
          path: httpRequest.path,
        }
      }
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

  async #orm({ values }) {
    try {
      const books = await this.#ormAdapter.selectRecord({
        table: 'book',
        values,
      });
      return books;
    } catch (error) {
      throw new Error('error getting books');
    }
  }

}

module.exports = {
  GetBooksController,
}