const Ajv = require('ajv');
const { AJVStrategy } = require('./ajv_strategy');

const ajvStrategy = new AJVStrategy({
  Ajv,
  options: {
    allErros: false,
  },
});

module.exports = {
  ajvStrategy,
}