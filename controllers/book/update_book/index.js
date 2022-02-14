class UpdateBookController {

  #ormAdapter;
  #schemaValidator;

  constructor({ ormAdapter, schemaValidator, factory }) {
    this.#ormAdapter = ormAdapter;
    this.#schemaValidator = schemaValidator;
  }

  async execute(httpRequest) {
    try {

    } catch (error) {

    }
  }

}

module.exports = {
  UpdateBookController,
}