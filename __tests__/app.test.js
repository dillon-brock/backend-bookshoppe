const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should return a list of books with array of authors', async () => {
    const res = await request(app).get('/books');
    expect(res.body.length).toEqual(7);
    const blackHoles = res.body.find((book) => book.title === 'The Little Book of Black Holes');
    expect(blackHoles).toHaveProperty('released', 2017);
    expect(blackHoles.authors[0]).toHaveProperty('name');
    expect(blackHoles.authors[0]).toHaveProperty('dob');
    expect(blackHoles.authors[0]).toHaveProperty('pob');
  });
  afterAll(() => {
    pool.end();
  });
});
