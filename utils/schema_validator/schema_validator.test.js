const { SchemaValidator } = require('./schema_validator');
const { ajvStrategy } = require('./ajv');

describe('schemaVaidator behavior with ajvStrategy', () => {

  const ajvValidator = new SchemaValidator({
    strategy: ajvStrategy,
  });

  test('should compile multiple schemaValidators', () => {

    const Schema1 = {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
      },
      required: ['id', 'title'],
      additionalProperties: false
    };

    ajvValidator.registerValidator({
      key: 'schema1',
      schema: Schema1,
    });

    const hasSchema1 = ajvValidator.hasValidator({ key: 'schema1' });

    expect(hasSchema1).toBe(true);
  });

  test('should not compile a schema validator', () => {
    try {
      const invalidSchema = {
        type: '',//invalid
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
        },
        required: ['id', 'title'],
        additionalProperties: false
      };

      ajvValidator.registerValidator({
        key: 'invalidSchema',
        schema: invalidSchema,
      });

    } catch (error) {
      expect(error.message).toBe('invalid schema');
    }
  });

  test('should return true after using validator strategy', () => {
    const Schema = {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
      },
      required: ['id', 'title'],
      additionalProperties: false
    };

    ajvValidator.registerValidator({
      key: 'schema',
      schema: Schema,
    });

    const isValid = ajvValidator.validate({
      schemaKey: 'schema',
      data: {
        id: '1',
        title: 'title 1',
      }
    });

    expect(isValid).toBe(true);
  });

  test('should return false after using validator strategy if missing prop', () => {
    const Schema = {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
      },
      required: ['id', 'title'],
      additionalProperties: false
    };

    ajvValidator.registerValidator({
      key: 'schema',
      schema: Schema,
    });

    const isValid = ajvValidator.validate({
      schemaKey: 'schema',
      data: {
        title: 'title 1',
      }
    });

    expect(isValid).toBe(false);
  });
});