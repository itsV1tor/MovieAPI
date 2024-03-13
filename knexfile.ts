import path = require('path');

const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.db'),
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.resolve(__dirname, 'src', 'database', 'knex', 'migrations'),
    },
    useNullAsDefault: true,
  },
};

export default config;
