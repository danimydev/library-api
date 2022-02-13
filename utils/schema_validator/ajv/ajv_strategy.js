class AJVStrategy {

  #ajv;
  #validators;

  constructor({ Ajv, options = { allErros: false } }) {
    this.#ajv = new Ajv(options);
    this.#validators = {};
  }

  validate({ schemaKey, data }) {
    const validator = this.#validators[schemaKey];
    return validator(data);
  }

  registerValidator({ key, schema }) {
    const validator = this.#ajv.compile(schema);
    this.#validators[key] = validator;
  }

  hasValidator({ key }) {
    return this.#validators.hasOwnProperty(key);
  }

}

module.exports = {
  AJVStrategy,
}