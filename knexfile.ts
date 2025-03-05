require('dotenv').config();

const config = {
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite',
  },
  useNullAsDefault: true,
  migrations: {
    directory: './migrations',
  },
};

module.exports = config;
