const { Book } = require('./book');
const { BookFactory } = require('./factory');
const { md5 } = require('../../utils/id_generator');
const { isValidDate } = require('../../utils/date_validator');

const bookFactory = new BookFactory({
  Book,
  generateId: md5,
  isValidDate,
});

module.exports = {
  bookFactory,
}