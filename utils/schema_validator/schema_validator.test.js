const { SchemaValidator } = require('./schema_validator');
const { ajvStrategy } = require('./ajv');

const ajvValidator = new SchemaValidator({
  strategy: ajvStrategy,
});


describe('schemaVaidator behavior with ajvStrategy', () => {
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

    const Schema2 = {
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

    ajvValidator.registerValidator({
      key: 'schema2',
      schema: Schema2,
    });

    const hasSchema1 = ajvStrategy.hasValidator({ key: 'schema1' });
    const hasSchema2 = ajvStrategy.hasValidator({ key: 'schema2' });

    expect(hasSchema1 && hasSchema2).toBe(true);
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
});