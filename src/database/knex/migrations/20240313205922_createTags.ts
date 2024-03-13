import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tags', (table) => {
    table.increments('id').primary();
    table.integer('movie_id').unsigned().references('movies.id');
    table.integer('user_id').unsigned().references('users.id');
    table.string('name').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {}
