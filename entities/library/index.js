const { Library } = require('./library');
const { LibraryFactory } = require('./factory');
const { md5 } = require('../../utils/id_generator');

const libraryFactory = new LibraryFactory({
  Library,
  generateId: md5,
});

module.exports = {
  libraryFactory,
}