class KnexAdapter {

  #knex;
  #_config;

  constructor({ knex, config }) {
    this.#_config = config;
    this.#knex = knex(this.#_config);
  }

  get config() {
    return this.#_config;
  }

  async selectRecord({ table, values }) {
    return this.#knex
      .select('*')
      .from(table)
      .where(values);
  }

  async insertRecord({ table, values }) {
    return this.#knex(table)
      .insert(values)
      .returning('*');
  }

  async updateRecord({ table, id, values }) {
    return this.#knex(table)
      .where({ id })
      .update(values)
      .returning('*');
  }

  async deleteRecord({ table, values }) {
    return await this.#knex(table)
      .where(values)
      .del();
  }

  getKnex() {
    return this.#knex;
  }

}

function buildKnexConfig(database) {
  return {
    client: database.client,
    connection: {
      host: database.host,
      port: database.port,
      user: database.user,
      password: database.password,
      database: database.name,
    }
  }
}

module.exports = {
  KnexAdapter,
  buildKnexConfig,
}