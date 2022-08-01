

module.exports = class Book {
  id;
  title;
  released;
  
  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
  }
};
