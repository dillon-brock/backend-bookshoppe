const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should return a list of books', async () => {
    const res = await request(app).get('/books');
    expect(res.body.length).toEqual(7);
    const blackHoles = res.body.find((book) => book.title === 'The Little Book of Black Holes');
    expect(blackHoles).toHaveProperty('released', 2017);
  });
  afterAll(() => {
    pool.end();
  });
});

describe ('author routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should return a list of authors with id and name', async () => {
    const res = await request(app).get('/authors');
    expect(res.body.length).toEqual(7);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String)
    });
  });
});
