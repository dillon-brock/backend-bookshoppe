-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS books_authors;

CREATE TABLE books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  released INT NOT NULL
);

INSERT INTO books (title, released) VALUES
  ('Good Omens', 1990),
  ('American Gods', 2001),
  ('The Talisman', 1984),
  ('The Shining', 1977),
  ('All The Light We Cannot See', 2014),
  ('About Grace', 2004),
  ('The Little Book of Black Holes', 2017);

CREATE TABLE authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  dob DATE,
  pob VARCHAR
);

INSERT INTO authors (name, dob, pob) VALUES
  ('Neil Gaiman', '1960-11-10', 'Portchester, UK'),
  ('Terry Pratchett', '1948-04-28', 'Beaconsfield, UK'),
  ('Stephen King', '1947-09-21', 'Portland, ME'),
  ('Peter Straub', '1943-03-02', 'Milwaukee, WI'),
  ('Anthony Doerr', '1973-10-27', 'Cleveland, OH'),
  ('Steven S. Gubser', '1972-05-04', 'Tulsa, OK'),
  ('Frans Pretorius', '1973-07-31', 'Johannesburg, South Africa');

CREATE TABLE books_authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  book_id BIGINT,
  author_id BIGINT,
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (author_id) REFERENCES authors(id)
);

INSERT INTO books_authors (book_id, author_id) VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (3, 3),
  (3, 4),
  (4, 3),
  (5, 5),
  (6, 5),
  (7, 6),
  (7, 7);



