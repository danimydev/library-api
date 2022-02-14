class GetBooksController {

  #ormAdapter;

  constructor({ ormAdapter }) {
    this.#ormAdapter = ormAdapter;
  }

  async execute(httpRequest) {
    try {
      const books = await this.#orm();
      return {
        statusCode: 200,
        body: {
          books,
          method: httpRequest.method,
          path: httpRequest.path,
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async #orm() {
    try {
      const books = await this.#ormAdapter.selectRecord({
        table: 'book',
        values: {},
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