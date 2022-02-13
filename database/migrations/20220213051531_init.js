/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {

  let exists = true;

  exists = await knex.schema.hasTable('book');
  if (!exists) {
    await knex.schema.createTable('book', table => {
      table.string('id').primary();
      table.string('title').unique().notNullable();
      table.string('author_id').notNullable();
      table.date('published_date').notNullable();
      table.string('category').notNullable();
      table.string('isbn').unique().notNullable();
      table.timestamps(true, true);
    });
  }

  exists = await knex.schema.hasTable('author');
  if (!exists) {
    await knex.schema.createTable('author', table => {
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('surname').nullable();
      table.date('birth_date').notNullable();
      table.date('death_date').nullable();
      table.timestamps(true, true);
    });
  }

  exists = await knex.schema.hasTable('library');
  if (!exists) {
    //Creates Library
    await knex.schema.createTable('library', table => {
      table.string('id').primary();
      table.string('name').unique().notNullable();
      table.string('address').notNullable();
      table.timestamps(true, true);
    });
  }

  exists = await knex.schema.hasTable('book_item');
  if (!exists) {
    //Creates Book_Item
    await knex.schema.createTable('book_item', table => {
      table.increments().primary();
      table.string('isbn').notNullable();
      table.string('library_id').notNullable();
      table.timestamps(true, true);
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {

  let exists = false;

  exists = await knex.schema.hasTable('book');
  if (exists) {
    await knex.schema.dropTable('book');
  }

  exists = await knex.schema.hasTable('author');
  if (exists) {
    await knex.schema.dropTable('author');
  }

  exists = await knex.schema.hasTable('library');
  if (exists) {
    await knex.schema.dropTable('library');
  }

  exists = await knex.schema.hasTable('book_item');
  if (exists) {
    await knex.schema.dropTable('book_item');
  }

};
