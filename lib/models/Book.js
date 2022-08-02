const pool = require('../utils/pool');
const Author = require('./Author');

module.exports = class Book {
  id;
  title;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
    if (row.authors) {
      this.authors = 
        row.authors.length > 0 ? row.authors.map((author) => new Author(author)) : [];
    }
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM books;');
    return rows.map((row) => new Book(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT 
      books.*, 
      COALESCE(
        json_agg(json_build_object('id', authors.id, 'name', authors.name))
        FILTER (WHERE authors.id IS NOT NULL), '[]'
    ) as authors from books 
      LEFT JOIN books_authors on books.id = books_authors.book_id 
      LEFT JOIN authors on books_authors.author_id = authors.id
      WHERE books.id = $1
      GROUP BY books.id`,
      [id]
    );
    return new Book(rows[0]);
  }
};
