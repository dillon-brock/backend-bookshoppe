const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('author routes', () => {
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
  it('should return an author with id matching the req params and an array of books', async () => {
    const res = await request(app).get('/authors/1');
    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      dob: expect.any(String),
      pob: expect.any(String),
      books: expect.any(Array)
    });
  });
  afterAll(() => {
    pool.end();
  });
});
