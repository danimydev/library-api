const { Server } = require('./server');
const { FastifyStrategy } = require('./web/fastify_strategy');

const httpStrategy = new FastifyStrategy({ options: { logger: false } });
const server = new Server({ httpStrategy });
const port = 3000;
const fastify = httpStrategy.server;

server.start({ port });

describe('server routes witn controller executables', () => {

  test('GET localhost:3000/books status should be 200', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/books'
    });
    expect(response.statusCode).toBe(200);
  });

  test('POST localhost:3000/books status should be 500 / body is not passed', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/books'
    });
    expect(response.statusCode).toBe(500);
  });

});