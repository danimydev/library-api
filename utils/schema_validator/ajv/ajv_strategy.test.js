const Ajv = require('ajv');
const { AJVStrategy } = require('./ajv_strategy');

const ajvStrategy = new AJVStrategy({
  Ajv,
  options: {
    allErros: false,
  },
});

const bookSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
  },
  required: ["id", "title"],
  additionalProperties: false
};

describe('AJVStrategy register and validate behaviour', () => {

  test('should register a validator from schema object', () => {

    ajvStrategy.registerValidator({
      key: 'book',
      schema: bookSchema,
    });

    const hasBookValidator = ajvStrategy.hasValidator({ key: 'book' });

    expect(hasBookValidator).toBe(true);
  });

  test('should return true on validating book', () => {

    const book = {
      id: '1',
      title: 'book 1',
    };

    const isValid = ajvStrategy.validate({
      schemaKey: 'book',
      data: book,
    });

    expect(isValid).toBe(true);
  });

  test('should return false on validating book', () => {

    const book = {
      title: 'book 1',
    };

    const isValid = ajvStrategy.validate({
      schemaKey: 'book',
      data: book,
    });

    expect(isValid).toBe(false);
  });

  test('should return false on validating book', () => {

    const book = {
      id: 1,
      title: 'book 1',
    };

    const isValid = ajvStrategy.validate({
      schemaKey: 'book',
      data: book,
    });

    expect(isValid).toBe(false);
  });

});