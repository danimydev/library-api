// Update with your config settings.
// TODO fix config load to use config module here!
const developmentConfig = {
  client: 'pg',
  connection: {
    database: 'default_db',
    user: 'postgres',
    password: 'secret',
  }
}

const clients = {
  'pg': 'postgresql',
}

developmentConfig.client = clients[developmentConfig.client];

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: developmentConfig.client,
    connection: developmentConfig.connection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  /* 
    staging: {
      client: 'postgresql',
      connection: {
        database: 'my_db',
        user: 'username',
        password: 'password'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    },
  
    production: {
      client: 'postgresql',
      connection: {
        database: 'my_db',
        user: 'username',
        password: 'password'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    }
   */
};
