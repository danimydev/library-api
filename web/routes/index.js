const { makeFastifyCallback } = require('../callback_adapter');
const { getIndex, postIndex } = require('../../controllers');

module.exports = (fastify, opts, next) => {

  fastify.get('/', makeFastifyCallback(getIndex));

  fastify.post('/', makeFastifyCallback(postIndex));

  next();
}