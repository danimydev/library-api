class DeleteBookController {

  #ormAdapter;

  constructor({ ormAdapter }) {
    this.#ormAdapter = ormAdapter;
  }

  async execute(httpRequest) {
    try {
      const { id } = httpRequest.params;
      const deleted = id
        ? await this.#orm({ values: { id } })
        : await this.#orm({ values: {} });
      return {
        statusCode: 200,
        body: {
          deleted,
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

  async #orm({ values }) {
    try {
      await this.#ormAdapter.deleteRecord({
        table: 'book',
        values,
      });
      return true;
    } catch (error) {
      throw new Error('error inserting book');
    }
  }

}

module.exports = {
  DeleteBookController,
}