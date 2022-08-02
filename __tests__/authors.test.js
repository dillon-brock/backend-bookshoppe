const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Author } = require('../lib/models/Author');

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
  it('should add a new author', async () => {
    const author = new Author({
      name: 'Octavia E. Butler',
      dob: '1947-06-22',
      pob: 'Pasadena, CA'
    });
    const res = await request(app).post('/authors').send(author);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Octavia E. Butler',
      dob: expect.any(String),
      pob: 'Pasadena, CA'
    });
  });
  it('should add a new author associated with books', async () => {
    const authorWithBookIds = {
      name: 'Miranda July',
      dob: '1974-02-15',
      pob: 'Barre, VT',
      bookIds: [8, 9]
    };
    const res = await request(app).post('/authors').send(authorWithBookIds);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Miranda July',
      dob: expect.any(String),
      pob: 'Barre, VT',
      bookIds: [8, 9]
    });
  });
  
  afterAll(() => {
    pool.end();
  });
});
