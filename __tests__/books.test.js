const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Book } = require('../lib/models/Book');

describe('book routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should return a list of books', async () => {
    const res = await request(app).get('/books');
    expect(res.body.length).toEqual(7);
    const blackHoles = res.body.find(
      (book) => book.title === 'The Little Book of Black Holes'
    );
    expect(blackHoles).toHaveProperty('released', 2017);
  });
  it('should return a book with id matching req params and array of authors', async () => {
    const res = await request(app).get('/books/1');
    expect(res.body).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      released: expect.any(Number),
      authors: expect.any(Array)
    });
  });
  it('should add a new book', async () => {
    const book = new Book({
      title: 'Crying In H Mart',
      released: 2021
    });
    const res = await request(app).post('/books').send(book);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'Crying In H Mart',
      released: 2021
    });
  });
  afterAll(() => {
    pool.end();
  });
});
