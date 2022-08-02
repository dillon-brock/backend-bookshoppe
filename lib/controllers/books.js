const { Router } = require('express');
const { Book } = require('../models/Book');

module.exports = Router()
  .get('/', async (req, res) => {
    const books = await Book.getAll();
    res.json(books);
  })
  .get('/:id', async (req, res) => {
    const book = await Book.getById(req.params.id);
    res.json(book);
  })
  .post('/', async (req, res) => {
    const newBook = await Book.insert(req.body);
    if (req.body.authorIds) {
      req.body.authorIds.map((authorId) => newBook.addAuthorById(authorId));
    }
    res.json(newBook);
  });
