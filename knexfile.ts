import type { Knex } from "knex";
import dotenv from "dotenv";
dotenv.config();

const config: Knex.Config = {
  client: "better-sqlite3",
  connection: {
    filename: './database.sqlite',
  },
  useNullAsDefault: true, // This ensures null values don't break anything
  migrations: {
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};

export default config;
