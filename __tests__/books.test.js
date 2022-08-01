const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
    const res = await request(app).get('/books/:id');
    expect(res.body).toEqual({
      title: expect.any(String),
      released: expect.any(Number),
      authors: expect.any(Array)
    });
  });
  afterAll(() => {
    pool.end();
  });
});
