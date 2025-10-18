import client from "./db";
import { PoolClient } from "pg";

// ========== TYPE DEFINITIONS ==========

export type Author = {
  id?: number;
  name: string;
  bio?: string;
};

export type Genre = {
  id?: number;
  name: string;
  description?: string;
};

export type Book = {
  id?: number;
  title: string;
  description?: string;
  isbn?: string;
  genre_id?: number;
};

export type BookAuthor = {
  book_id: number;
  author_id: number;
  is_main_author?: boolean;
};

export type BookWithDetails = Book & {
  genre_name?: string;
  genre_description?: string;
  authors?: Author[];
};

export type User = {
  id?: number;
  name?: string;
  email: string;
  hash: string;
};

// ========== ERROR HANDLING ==========

export class DatabaseError extends Error {
  constructor(message: string, public originalError?: any) {
    super(message);
    this.name = "DatabaseError";
  }
}

const handleDatabaseError = (error: any, operation: string): never => {
  console.error(`Database error during ${operation}:`, error);
  throw new DatabaseError(`Failed to ${operation}`, error);
};

// ========== DATABASE HELPERS ==========

const executeQuery = async <T>(
  query: string,
  params: any[] = [],
  operation: string
): Promise<T[]> => {
  let connection: PoolClient | null = null;

  try {
    connection = await client.connect();
    const result = await connection.query(query, params);
    return result.rows;
  } catch (error) {
    handleDatabaseError(error, operation);
  } finally {
    if (connection) {
      connection.release();
    }
  }

  // This line will never be reached due to handleDatabaseError throwing
  return [];
};

const executeQuerySingle = async <T>(
  query: string,
  params: any[] = [],
  operation: string
): Promise<T | null> => {
  const results = await executeQuery<T>(query, params, operation);
  return results.length > 0 ? (results[0] as T) : null;
};

const executeDelete = async (
  query: string,
  params: any[] = [],
  operation: string
): Promise<boolean> => {
  let connection: PoolClient | null = null;

  try {
    connection = await client.connect();
    const result = await connection.query(query, params);
    return (result.rowCount || 0) > 0;
  } catch (error) {
    handleDatabaseError(error, operation);
  } finally {
    if (connection) {
      connection.release();
    }
  }

  // This line will never be reached due to handleDatabaseError throwing
  return false;
};

// ========== AUTHOR CRUD OPERATIONS ==========

export const createAuthor = async (
  author: Omit<Author, "id">
): Promise<Author> => {
  const query = `
    INSERT INTO authors (name, bio) 
    VALUES ($1, $2) 
    RETURNING *
  `;
  const params = [author.name, author.bio || null];

  const result = await executeQuerySingle<Author>(
    query,
    params,
    "create author"
  );
  if (!result) {
    throw new DatabaseError("Failed to create author - no result returned");
  }
  return result;
};

export const getAuthorById = async (id: number): Promise<Author | null> => {
  const query = `SELECT * FROM authors WHERE id = $1`;
  return executeQuerySingle<Author>(query, [id], "get author by id");
};

export const getAllAuthors = async (): Promise<Author[]> => {
  const query = `SELECT * FROM authors ORDER BY name`;
  return executeQuery<Author>(query, [], "get all authors");
};

export const updateAuthor = async (
  id: number,
  author: Partial<Omit<Author, "id">>
): Promise<Author | null> => {
  const fields: string[] = [];
  const params: any[] = [];
  let paramIndex = 1;

  if (author.name !== undefined) {
    fields.push(`name = $${paramIndex++}`);
    params.push(author.name);
  }
  if (author.bio !== undefined) {
    fields.push(`bio = $${paramIndex++}`);
    params.push(author.bio);
  }

  if (fields.length === 0) {
    throw new DatabaseError("No fields provided for update");
  }

  params.push(id);
  const query = `
    UPDATE authors 
    SET ${fields.join(", ")} 
    WHERE id = $${paramIndex} 
    RETURNING *
  `;

  return executeQuerySingle<Author>(query, params, "update author");
};

export const deleteAuthor = async (id: number): Promise<boolean> => {
  const query = `DELETE FROM authors WHERE id = $1`;
  return executeDelete(query, [id], "delete author");
};

// ========== GENRE CRUD OPERATIONS ==========

export const createGenre = async (genre: Omit<Genre, "id">): Promise<Genre> => {
  const query = `
    INSERT INTO genres (name, description) 
    VALUES ($1, $2) 
    RETURNING *
  `;
  const params = [genre.name, genre.description || null];

  const result = await executeQuerySingle<Genre>(query, params, "create genre");
  if (!result) {
    throw new DatabaseError("Failed to create genre - no result returned");
  }
  return result;
};

export const getGenreById = async (id: number): Promise<Genre | null> => {
  const query = `SELECT * FROM genres WHERE id = $1`;
  return executeQuerySingle<Genre>(query, [id], "get genre by id");
};

export const getAllGenres = async (): Promise<Genre[]> => {
  const query = `SELECT * FROM genres ORDER BY name`;
  return executeQuery<Genre>(query, [], "get all genres");
};

export const updateGenre = async (
  id: number,
  genre: Partial<Omit<Genre, "id">>
): Promise<Genre | null> => {
  const fields: string[] = [];
  const params: any[] = [];
  let paramIndex = 1;

  if (genre.name !== undefined) {
    fields.push(`name = $${paramIndex++}`);
    params.push(genre.name);
  }
  if (genre.description !== undefined) {
    fields.push(`description = $${paramIndex++}`);
    params.push(genre.description);
  }

  if (fields.length === 0) {
    throw new DatabaseError("No fields provided for update");
  }

  params.push(id);
  const query = `
    UPDATE genres 
    SET ${fields.join(", ")} 
    WHERE id = $${paramIndex} 
    RETURNING *
  `;

  return executeQuerySingle<Genre>(query, params, "update genre");
};

export const deleteGenre = async (id: number): Promise<boolean> => {
  const query = `DELETE FROM genres WHERE id = $1`;
  return executeDelete(query, [id], "delete genre");
};

// ========== BOOK CRUD OPERATIONS ==========

export const createBook = async (book: Omit<Book, "id">): Promise<Book> => {
  const query = `
    INSERT INTO books (title, description, isbn, genre_id) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *
  `;
  const params = [
    book.title,
    book.description || null,
    book.isbn || null,
    book.genre_id || null,
  ];

  const result = await executeQuerySingle<Book>(query, params, "create book");
  if (!result) {
    throw new DatabaseError("Failed to create book - no result returned");
  }
  return result;
};

export const getBookById = async (
  id: number
): Promise<BookWithDetails | null> => {
  const query = `
    SELECT 
      b.*,
      g.name as genre_name,
      g.description as genre_description
    FROM books b
    LEFT JOIN genres g ON b.genre_id = g.id
    WHERE b.id = $1
  `;

  const book = await executeQuerySingle<BookWithDetails>(
    query,
    [id],
    "get book by id"
  );

  if (book) {
    // Get associated authors
    const authorsQuery = `
      SELECT a.* 
      FROM authors a
      JOIN books_authors ba ON a.id = ba.author_id
      WHERE ba.book_id = $1
      ORDER BY ba.is_main_author DESC, a.name
    `;
    book.authors = await executeQuery<Author>(
      authorsQuery,
      [id],
      "get book authors"
    );
  }

  return book;
};

export const getAllBooks = async (): Promise<BookWithDetails[]> => {
  const query = `
    SELECT 
      b.*,
      g.name as genre_name,
      g.description as genre_description
    FROM books b
    LEFT JOIN genres g ON b.genre_id = g.id
    ORDER BY b.title
  `;

  const books = await executeQuery<BookWithDetails>(query, [], "get all books");

  // Get authors for each book
  for (const book of books) {
    if (book.id) {
      const authorsQuery = `
        SELECT a.* 
        FROM authors a
        JOIN books_authors ba ON a.id = ba.author_id
        WHERE ba.book_id = $1
        ORDER BY ba.is_main_author DESC, a.name
      `;
      book.authors = await executeQuery<Author>(
        authorsQuery,
        [book.id],
        "get book authors"
      );
    }
  }

  return books;
};

export const getBooksByGenre = async (
  genreId: number
): Promise<BookWithDetails[]> => {
  const query = `
    SELECT 
      b.*,
      g.name as genre_name,
      g.description as genre_description
    FROM books b
    LEFT JOIN genres g ON b.genre_id = g.id
    WHERE b.genre_id = $1
    ORDER BY b.title
  `;

  const books = await executeQuery<BookWithDetails>(
    query,
    [genreId],
    "get books by genre"
  );

  // Get authors for each book
  for (const book of books) {
    if (book.id) {
      const authorsQuery = `
        SELECT a.* 
        FROM authors a
        JOIN books_authors ba ON a.id = ba.author_id
        WHERE ba.book_id = $1
        ORDER BY ba.is_main_author DESC, a.name
      `;
      book.authors = await executeQuery<Author>(
        authorsQuery,
        [book.id],
        "get book authors"
      );
    }
  }

  return books;
};

export const getBooksByAuthor = async (
  authorId: number
): Promise<BookWithDetails[]> => {
  const query = `
    SELECT 
      b.*,
      g.name as genre_name,
      g.description as genre_description
    FROM books b
    LEFT JOIN genres g ON b.genre_id = g.id
    JOIN books_authors ba ON b.id = ba.book_id
    WHERE ba.author_id = $1
    ORDER BY b.title
  `;

  const books = await executeQuery<BookWithDetails>(
    query,
    [authorId],
    "get books by author"
  );

  // Get all authors for each book
  for (const book of books) {
    if (book.id) {
      const authorsQuery = `
        SELECT a.* 
        FROM authors a
        JOIN books_authors ba ON a.id = ba.author_id
        WHERE ba.book_id = $1
        ORDER BY ba.is_main_author DESC, a.name
      `;
      book.authors = await executeQuery<Author>(
        authorsQuery,
        [book.id],
        "get book authors"
      );
    }
  }

  return books;
};

export const updateBook = async (
  id: number,
  book: Partial<Omit<Book, "id">>
): Promise<Book | null> => {
  const fields: string[] = [];
  const params: any[] = [];
  let paramIndex = 1;

  if (book.title !== undefined) {
    fields.push(`title = $${paramIndex++}`);
    params.push(book.title);
  }
  if (book.description !== undefined) {
    fields.push(`description = $${paramIndex++}`);
    params.push(book.description);
  }
  if (book.isbn !== undefined) {
    fields.push(`isbn = $${paramIndex++}`);
    params.push(book.isbn);
  }
  if (book.genre_id !== undefined) {
    fields.push(`genre_id = $${paramIndex++}`);
    params.push(book.genre_id);
  }

  if (fields.length === 0) {
    throw new DatabaseError("No fields provided for update");
  }

  params.push(id);
  const query = `
    UPDATE books 
    SET ${fields.join(", ")} 
    WHERE id = $${paramIndex} 
    RETURNING *
  `;

  return executeQuerySingle<Book>(query, params, "update book");
};

export const deleteBook = async (id: number): Promise<boolean> => {
  const query = `DELETE FROM books WHERE id = $1`;
  return executeDelete(query, [id], "delete book");
};

// ========== BOOK-AUTHOR RELATIONSHIP OPERATIONS ==========

export const addAuthorToBook = async (
  bookId: number,
  authorId: number,
  isMainAuthor: boolean = false
): Promise<BookAuthor> => {
  const query = `
    INSERT INTO books_authors (book_id, author_id, is_main_author) 
    VALUES ($1, $2, $3) 
    ON CONFLICT (book_id, author_id) 
    DO UPDATE SET is_main_author = EXCLUDED.is_main_author
    RETURNING *
  `;
  const params = [bookId, authorId, isMainAuthor];

  const result = await executeQuerySingle<BookAuthor>(
    query,
    params,
    "add author to book"
  );
  if (!result) {
    throw new DatabaseError(
      "Failed to add author to book - no result returned"
    );
  }
  return result;
};

export const removeAuthorFromBook = async (
  bookId: number,
  authorId: number
): Promise<boolean> => {
  const query = `DELETE FROM books_authors WHERE book_id = $1 AND author_id = $2`;
  return executeDelete(query, [bookId, authorId], "remove author from book");
};

export const getBookAuthors = async (bookId: number): Promise<Author[]> => {
  const query = `
    SELECT a.*, ba.is_main_author
    FROM authors a
    JOIN books_authors ba ON a.id = ba.author_id
    WHERE ba.book_id = $1
    ORDER BY ba.is_main_author DESC, a.name
  `;
  return executeQuery<Author>(query, [bookId], "get book authors");
};

export const updateAuthorBookRelation = async (
  bookId: number,
  authorId: number,
  isMainAuthor: boolean
): Promise<BookAuthor | null> => {
  const query = `
    UPDATE books_authors 
    SET is_main_author = $3 
    WHERE book_id = $1 AND author_id = $2 
    RETURNING *
  `;
  return executeQuerySingle<BookAuthor>(
    query,
    [bookId, authorId, isMainAuthor],
    "update author book relation"
  );
};

// ========== SEARCH OPERATIONS ==========

export const searchBooks = async (
  searchTerm: string
): Promise<BookWithDetails[]> => {
  const query = `
    SELECT DISTINCT
      b.*,
      g.name as genre_name,
      g.description as genre_description
    FROM books b
    LEFT JOIN genres g ON b.genre_id = g.id
    LEFT JOIN books_authors ba ON b.id = ba.book_id
    LEFT JOIN authors a ON ba.author_id = a.id
    WHERE 
      LOWER(b.title) LIKE LOWER($1) OR
      LOWER(b.description) LIKE LOWER($1) OR
      LOWER(b.isbn) LIKE LOWER($1) OR
      LOWER(g.name) LIKE LOWER($1) OR
      LOWER(a.name) LIKE LOWER($1)
    ORDER BY b.title
  `;

  const searchPattern = `%${searchTerm}%`;
  const books = await executeQuery<BookWithDetails>(
    query,
    [searchPattern],
    "search books"
  );

  // Get authors for each book
  for (const book of books) {
    if (book.id) {
      book.authors = await getBookAuthors(book.id);
    }
  }

  return books;
};

export const searchAuthors = async (searchTerm: string): Promise<Author[]> => {
  const query = `
    SELECT * FROM authors 
    WHERE LOWER(name) LIKE LOWER($1) OR LOWER(bio) LIKE LOWER($1)
    ORDER BY name
  `;
  const searchPattern = `%${searchTerm}%`;
  return executeQuery<Author>(query, [searchPattern], "search authors");
};

export const searchGenres = async (searchTerm: string): Promise<Genre[]> => {
  const query = `
    SELECT * FROM genres 
    WHERE LOWER(name) LIKE LOWER($1) OR LOWER(description) LIKE LOWER($1)
    ORDER BY name
  `;
  const searchPattern = `%${searchTerm}%`;
  return executeQuery<Genre>(query, [searchPattern], "search genres");
};

// ========== LEGACY SUPPORT (for backward compatibility) ==========

export const writeBook = async (book: Omit<Book, "id">): Promise<Book> => {
  console.warn("writeBook is deprecated, use createBook instead");
  return createBook(book);
};

export const readBook = async (): Promise<BookWithDetails[]> => {
  console.warn("readBook is deprecated, use getAllBooks instead");
  return getAllBooks();
};

//User Create
export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const query = `
    INSERT INTO users (name, email, hash) 
    VALUES ($1, $2, $3) 
    RETURNING *
  `;

  const params = [user.name, user.email, user.hash];

  const result = await executeQuerySingle<User>(query, params, "create user");
  if (!result) {
    throw new DatabaseError("Failed to create user - no result returned");
  }
  return result;
};

//Get User by Id
export const getUserById = async (id: number): Promise<User | null> => {
  const query = `SELECT * FROM authors WHERE id = $1`;
  return executeQuerySingle<User>(query, [id], "get user by id");
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const query = `SELECT * FROM users WHERE email = $1`;
  return executeQuerySingle<User>(query, [email], "get user by email");
};

//Get all users
export const getAllUsers = async (): Promise<User[]> => {
  const query = `SELECT * FROM authors ORDER BY name`;
  return executeQuery<User>(query, [], "get all authors");
};
