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
    try {
      const selected = await this.#knex
        .select('*')
        .from(table)
        .where(values);
      return selected.length ? this.parsedDBRecord(selected[0]) : {};
    } catch (error) {
      throw error;
    }
  }

  async insertRecord({ table, values }) {
    try {
      const inserted = await this.#knex(table)
        .insert(values)
        .returning('*');
      return inserted.length ? this.parsedDBRecord(inserted[0]) : {};
    } catch (error) {
      throw error;
    }
  }

  async updateRecord({ table, id, values }) {
    try {
      const updated = await this.#knex(table)
        .where({ id })
        .update(values)
        .returning('*');
      return updated.length ? this.parsedDBRecord(updated[0]) : {};
    } catch (error) {
      throw error;
    }
  }

  async deleteRecord({ table, values }) {
    try {
      return await this.#knex(table)
        .where(values)
        .del();
    } catch (error) {
      throw error;
    }
  }

  //TODO think a better solution
  parsedDBRecord(record) {
    const parsed = { ...record };

    delete parsed['created_at'];
    delete parsed['updated_at'];

    if (record.hasOwnProperty('published_date')) {
      parsed.published_date = new Date(parsed.published_date + '').toISOString();
    }

    return parsed;
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