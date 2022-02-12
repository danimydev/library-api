const { Book } = require('./book');
const { BookFactory } = require('./factory');
const { md5 } = require('../../utils/id_generator');

const bookFactory = new BookFactory({
    Book,
    generateId: md5,
});

module.exports = {
    bookFactory,
}