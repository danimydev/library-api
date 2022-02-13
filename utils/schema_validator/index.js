const { SchemaValidator } = require('./schema_validator');
const { ajvStrategy } = require('./ajv');

const ajvValidator = new SchemaValidator({
  strategy: ajvStrategy,
});

module.exports = {
  ajvValidator,
}