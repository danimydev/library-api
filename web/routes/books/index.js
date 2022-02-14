const { makeFastifyCallback } = require('../../callback_adapter');
const {
  getBooksController,
  createBookController, } = require('../../../controllers/book');

module.exports = (fastify, opts, next) => {

  fastify.get('/', makeFastifyCallback(getBooksController));

  fastify.get('/:id', makeFastifyCallback(getBooksController));

  fastify.post('/', makeFastifyCallback(createBookController));

  next();
}