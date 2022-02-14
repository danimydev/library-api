class DeleteBookController {

  #ormAdapter;

  constructor({ ormAdapter }) {
    this.#ormAdapter = ormAdapter;
  }

  async execute(httpRequest) {
    try {
      const { id } = httpRequest.params;
      this.#validateValues({ values: { id } });
      const deleted = !!await this.#orm({ values: { id } });
      return {
        statusCode: 200,
        body: {
          deleted,
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
      const { id } = values;
      if (!id || typeof id !== 'string') {
        throw new Error('id is missing or needs to be string');
      }
    } catch (error) {
      throw new Error('error validating on create book controller');
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