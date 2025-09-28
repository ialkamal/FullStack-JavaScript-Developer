-- CREATE BOOKS_AUTHORS JOIN TABLE
CREATE TABLE books_authors (
  book_id        INT NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  author_id      INT NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
  is_main_author BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (book_id, author_id)
);