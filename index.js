const { Server } = require('./server');
const { FastifyStrategy } = require('./web/fastify_strategy');

const httpStrategy = new FastifyStrategy({});

const server = new Server({ httpStrategy });

server.start({ port: 3000 });