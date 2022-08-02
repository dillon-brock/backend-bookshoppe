const pool = require('../utils/pool');

class Author {
  id;
  name;
  dob;
  pob;
  books;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
    if (row.books) {
      this.books = 
        row.books.length > 0 ? row.books : [];
    }
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT id, name FROM authors;');
    return rows.map((row) => new Author(row));
  }
  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT 
      authors.*, 
      COALESCE(
        json_agg(json_build_object(
          'id', books.id, 
          'title', books.title, 
          'released', books.released))
        FILTER (WHERE books.id IS NOT NULL), '[]'
    ) as books from authors 
      LEFT JOIN books_authors on authors.id = books_authors.author_id 
      LEFT JOIN books on books_authors.book_id = books.id
      WHERE authors.id = $1
      GROUP BY authors.id`,
      [id]
    );
    return new Author(rows[0]);
  }
}

module.exports = { Author };
