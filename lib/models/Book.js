const pool = require('../utils/pool');

class Book {
  id;
  title;
  released;
  authors;

  constructor({ id, title, released, authors }) {
    this.id = id;
    this.title = title;
    this.released = released;
    if (authors) {
      this.authors = 
        authors.length > 0 ? authors : [];
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

  static async insert({ title, released }) {
    const { rows } = await pool.query(
      `INSERT INTO books (title, released)
      VALUES ($1, $2) RETURNING *`, [title, released]);
    return new Book(rows[0]);
  }

  async addAuthorById(authorId) {
    await pool.query(
      `INSERT INTO books_authors (book_id, author_id)
        VALUES ($1, $2) RETURNING *;
      `, [this.id, authorId]);
    return this;
  }
}

module.exports = { Book };
