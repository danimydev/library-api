require('dotenv').config();

const config = {
  enviroment: process.env.ENV,
  database: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME,
    }
  }
}

module.exports = {
  config,
}