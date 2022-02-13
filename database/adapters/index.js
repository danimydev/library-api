const knex = require('knex');
const { KnexAdapter, buildKnexConfig } = require('./knex');
const { config: { database } } = require('../../config');

const knexAdapter = new KnexAdapter({
  knex,
  config: buildKnexConfig(database),
});

module.exports = {
  knexAdapter,
}