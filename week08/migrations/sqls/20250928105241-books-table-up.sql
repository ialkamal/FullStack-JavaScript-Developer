-- CREATE BOOKS TABLE
CREATE TABLE books (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  isbn        CHAR(13) UNIQUE,
  genre_id    INT REFERENCES genres(id)
);