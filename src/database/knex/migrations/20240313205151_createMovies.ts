import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('movies', (table) => {
    table.increments('id').primary();
    table.string('description');
    table.integer('raiting');
    table.integer('user_id').unsigned().references('users.id');
    table.timestamps(true, true).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('movies');
}
