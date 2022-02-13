const { makeFastifyCallback } = require('../callback_adapter');
const { getIndex } = require('../../controllers');

module.exports = (fastify, opts, next) => {

  fastify.get('/', makeFastifyCallback(getIndex));

  fastify.post('/', function (request, reply) {
    reply.code(201).send('OK');
  });

  next();
}