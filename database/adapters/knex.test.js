const knex = require('knex');
const { KnexAdapter, buildKnexConfig } = require('./knex');
const { config: { database } } = require('../../config');

/*//mockDB
database.host = 'localhost';
database.port = 5432;
database.user = 'postgres';
database.password = 'secret';
database.name = 'test';
*/

describe('knex ORMAdpater behaviour', () => {

  test('should create a KnexAdapter', () => {
    const knexAdapter = new KnexAdapter({
      knex,
      config: buildKnexConfig(database),
    });
    expect(knexAdapter.config).toEqual(buildKnexConfig(database));
  });

});