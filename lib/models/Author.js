const pool = require('../utils/pool');

module.exports = class Author {
  id;
  name;
  dob;
  pob;
  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT id, name FROM authors;');
    return rows.map((row) => new Author(row));
  }
};
