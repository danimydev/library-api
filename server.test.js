const { Server } = require('./server');
const { FastifyStrategy } = require('./web/fastify_strategy');

const httpStrategy = new FastifyStrategy({ options: { logger: false } });
const server = new Server({ httpStrategy });
const port = 3000;
const fastify = httpStrategy.server;

server.start({ port });

describe('server routes responses', () => {

  test('GET localhost:3000 status should be 200', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/'
    });
    expect(response.statusCode).toBe(200);
  });

  test('POST localhost:3000 status should be 201', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/'
    });
    expect(response.statusCode).toBe(201);
  });

  test('GET localhost:3000/books status should be 200', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/books'
    });
    expect(response.statusCode).toBe(200);
  });

  test('POST localhost:3000/books status should be 201', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/books'
    });
    expect(response.statusCode).toBe(201);
  });

  test('GET localhost:3000/authors status should be 200', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/authors'
    });
    expect(response.statusCode).toBe(200);
  });

  test('POST localhost:3000/authors status should be 201', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/authors'
    });
    expect(response.statusCode).toBe(201);
  });

});