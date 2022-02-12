const { makeFastifyCallback } = require('../../callback_adapter');
const { getBook, postBook } = require('../../../controllers/book');
const { getBookOpts, postBookOpts } = require('./options');

module.exports = (fastify, opts, next) => {
    
    fastify.get('/', makeFastifyCallback(getBook));

    fastify.post('/', makeFastifyCallback(postBook));

    next();
}