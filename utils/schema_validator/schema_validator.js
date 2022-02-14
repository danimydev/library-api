class SchemaValidator {

  #strategy;

  constructor({ strategy }) {
    this.#strategy = strategy;
  }

  validate(params) {
    return this.#strategy.validate(params);
  }

  registerValidator(params) {
    try {
      this.#strategy.registerValidator(params);
    } catch (error) {
      throw new Error('invalid schema');
    }
  }

  hasValidator({ key }) {
    return this.#strategy.hasValidator({ key });
  }

}

module.exports = {
  SchemaValidator,
}