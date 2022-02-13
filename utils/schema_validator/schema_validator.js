class SchemaValidator {

  #strategy;

  constructor({ strategy }) {
    this.#strategy = strategy;
  }

  validate(params) {
    return this.#strategy.validate(params);
  }

  registerValidator(params) {
    this.#strategy.registerValidator(params);
  }

}

module.exports = {
  SchemaValidator,
}