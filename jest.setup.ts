import knex from './src/config/database';

beforeAll(async () => {
    await knex.migrate.latest();
});

afterAll(async () => {
    await knex.destroy(); 
});
