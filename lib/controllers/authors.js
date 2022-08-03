const { Router } = require('express');
const { Author } = require('../models/Author');

module.exports = Router()
  .get('/', async (req, res) => {
    const authors = await Author.getAll();
    res.json(authors);
  })
  .get('/:id', async (req, res) => {
    const author = await Author.getById(req.params.id);
    res.json(author);
  })
  .post('/', async (req, res) => {
    const newAuthor = await Author.insert(req.body);
    if (req.body.bookIds) {
      await Promise.all(req.body.bookIds.map((id) => newAuthor.addBookById(id)));
    }
    res.json(newAuthor);
  });
