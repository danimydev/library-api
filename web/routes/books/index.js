const { makeFastifyCallback } = require('../../callback_adapter');
const { getBooks, getBookById, postBook } = require('../../../controllers/book');
const { getBookOpts, postBookOpts } = require('./options');

module.exports = (fastify, opts, next) => {

  fastify.get('/', makeFastifyCallback(getBooks));

  fastify.get('/:id', makeFastifyCallback(getBookById));

  fastify.post('/', makeFastifyCallback(postBook));

  next();
}