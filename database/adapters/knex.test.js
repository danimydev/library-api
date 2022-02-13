const knex = require('knex');
const { KnexAdapter, buildKnexConfig } = require('./knex');
const { config: { database } } = require('../../config');

const knexAdapter = new KnexAdapter({
  knex,
  config: buildKnexConfig(database),
});

describe('knex ORMAdpater behaviour', () => {

  test('should create a KnexAdapter', () => {
    expect(knexAdapter.config).toEqual(buildKnexConfig(database));
  });

  test('should insert and delete a record from books', async () => {
    const inserted = await knexAdapter.insertRecord({
      table: 'book',
      values: {
        id: 'ad88a73e5ebe79e715f1a273d22819b3',
        title: 'book 1',
        author_id: 'author 1',
        published_date: '2022-12-02T05:00:00.000Z',
        category: 'category 1',
        isbn: 'isbn 1',
      }
    });
    expect(inserted).toEqual({
      id: 'ad88a73e5ebe79e715f1a273d22819b3',
      title: 'book 1',
      author_id: 'author 1',
      published_date: '2022-12-02T05:00:00.000Z',
      category: 'category 1',
      isbn: 'isbn 1',
    });
  });

  test('should select a record from books', async () => {
    const selected = await knexAdapter.selectRecord({
      table: 'book',
      values: {
        id: 'ad88a73e5ebe79e715f1a273d22819b3',
      }
    });
    expect(selected).toEqual({
      id: 'ad88a73e5ebe79e715f1a273d22819b3',
      title: 'book 1',
      author_id: 'author 1',
      published_date: '2022-12-02T05:00:00.000Z',
      category: 'category 1',
      isbn: 'isbn 1',
    });
  });

  test('should update a book record from books table', async () => {
    const updated = await knexAdapter.updateRecord({
      table: 'book',
      id: 'ad88a73e5ebe79e715f1a273d22819b3',
      values: {
        id: 'ad88a73e5ebe79e715f1a273d22819b3',
        title: 'book updated',
        author_id: 'author 1 updated',
        published_date: '12-02-2022',
        category: 'category 1',
        isbn: 'isbn 1',
      }
    });
    expect(updated.title).toBe('book updated');
  });

  test('should delete a book record from books table', async () => {
    const deleted = await knexAdapter.deleteRecord({
      table: 'book',
      values: {
        id: 'ad88a73e5ebe79e715f1a273d22819b3',
      }
    });
    expect(!!deleted).toBe(true);
  });

});