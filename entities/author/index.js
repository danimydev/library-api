const { Author } = require('./author');
const { AuthorFactory } = require('./factory');
const { md5 } = require('../../utils/id_generator');
const { isValidDate } = require('../../utils/date_validator');

const authorFactory = new AuthorFactory({
  Author,
  generateId: md5,
  isValidDate,
});

module.exports = {
  authorFactory,
}