// Updated Migration File

export async function up(knex: any) {
  await knex.schema.createTable('users', (table: any) => {
    table.increments('id').primary();
    table.string('name');
    table.string('email');
  });

  await knex.schema.createTable('addresses', (table: any) => {
    table.increments('id').primary();
    table.integer('userId').references('id').inTable('users').onDelete('CASCADE');
    table.string('address').notNullable(); 
    table.timestamps(true, true); 
  });

  await knex.schema.createTable('posts', (table: any) => {
    table.increments('id').primary();
    table.string('title');
    table.string('body');
    table.integer('userId').references('id').inTable('users').onDelete('CASCADE');
    table.timestamps(true, true);
  });

  // Unique constraint on email column
  await knex.schema.alterTable('users', (table) => {
    table.string('email').unique().notNullable().alter();
  });
}

export async function down(knex: any) {
  // Remove the unique constraint on rollback
  await knex.schema.alterTable('users', (table) => {
    table.string('email').notNullable().alter();
  });

  await knex.schema.dropTable('posts');
  await knex.schema.dropTable('addresses');
  await knex.schema.dropTable('users');
}
