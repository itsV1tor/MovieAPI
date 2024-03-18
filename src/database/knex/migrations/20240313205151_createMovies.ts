import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('movies', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('description').notNullable;
    table.integer('raiting').notNullable;
    table.integer('user_id').unsigned().references('users.id');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('movies');
}
