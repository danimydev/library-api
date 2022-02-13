module.exports = (fastify, opts, next) => {

  fastify.get('/', function (request, reply) {
    reply.code(200).send('OK');
  });

  fastify.post('/', function (request, reply) {
    reply.code(201).send('OK');
  });

  next();
}