import "./helpers/setup";
import {
  createAuthor,
  createGenre,
  createBook,
  getAllBooks,
  getAllAuthors,
  getAllGenres,
  getAuthorById,
  getGenreById,
  getBookById,
  updateAuthor,
  updateGenre,
  updateBook,
  deleteAuthor,
  deleteGenre,
  deleteBook,
  addAuthorToBook,
  removeAuthorFromBook,
  searchBooks,
  searchAuthors,
  searchGenres,
  DatabaseError,
  Author,
  Genre,
  Book,
} from "../src/data";

describe("Database CRUD Operations", () => {
  let testAuthor: Author;
  let testGenre: Genre;
  let testBook: Book;

  // Clean up test data before and after tests
  beforeAll(async () => {
    console.log("🧹 Cleaning up any existing test data...");
    await cleanupTestData();
  });

  afterAll(async () => {
    console.log("🧹 Final cleanup...");
    await cleanupTestData();
  });

  describe("Author Operations", () => {
    it("should create a new author", async () => {
      testAuthor = await createAuthor({
        name: "Test Author",
        bio: "A test author for unit testing",
      });

      expect(testAuthor).toBeDefined();
      expect(testAuthor.id).toBeDefined();
      expect(testAuthor.name).toBe("Test Author");
      expect(testAuthor.bio).toBe("A test author for unit testing");
    });

    it("should get author by ID", async () => {
      const fetchedAuthor = await getAuthorById(testAuthor.id!);

      expect(fetchedAuthor).toBeDefined();
      expect(fetchedAuthor!.id).toBe(testAuthor.id);
      expect(fetchedAuthor!.name).toBe("Test Author");
    });

    it("should get all authors", async () => {
      const authors = await getAllAuthors();

      expect(Array.isArray(authors)).toBe(true);
      expect(authors.length).toBeGreaterThan(0);
      expect(authors.some((a) => a.id === testAuthor.id)).toBe(true);
    });

    it("should update an author", async () => {
      const updatedAuthor = await updateAuthor(testAuthor.id!, {
        bio: "Updated bio for testing",
      });

      expect(updatedAuthor).toBeDefined();
      expect(updatedAuthor!.bio).toBe("Updated bio for testing");
      expect(updatedAuthor!.name).toBe("Test Author"); // Should remain unchanged
    });

    it("should handle validation errors for author updates", async () => {
      try {
        await updateAuthor(testAuthor.id!, {});
        fail("Should have thrown validation error");
      } catch (error) {
        expect(error).toBeInstanceOf(DatabaseError);
        expect((error as DatabaseError).message).toContain(
          "No fields provided for update"
        );
      }
    });

    it("should search authors", async () => {
      const results = await searchAuthors("Test Author");

      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
      expect(results.some((a) => a.id === testAuthor.id)).toBe(true);
    });
  });

  describe("Genre Operations", () => {
    it("should create a new genre", async () => {
      testGenre = await createGenre({
        name: "Test Genre",
        description: "A genre for testing purposes",
      });

      expect(testGenre).toBeDefined();
      expect(testGenre.id).toBeDefined();
      expect(testGenre.name).toBe("Test Genre");
      expect(testGenre.description).toBe("A genre for testing purposes");
    });

    it("should get genre by ID", async () => {
      const fetchedGenre = await getGenreById(testGenre.id!);

      expect(fetchedGenre).toBeDefined();
      expect(fetchedGenre!.id).toBe(testGenre.id);
      expect(fetchedGenre!.name).toBe("Test Genre");
    });

    it("should get all genres", async () => {
      const genres = await getAllGenres();

      expect(Array.isArray(genres)).toBe(true);
      expect(genres.length).toBeGreaterThan(0);
      expect(genres.some((g) => g.id === testGenre.id)).toBe(true);
    });

    it("should update a genre", async () => {
      const updatedGenre = await updateGenre(testGenre.id!, {
        description: "Updated description for testing",
      });

      expect(updatedGenre).toBeDefined();
      expect(updatedGenre!.description).toBe("Updated description for testing");
      expect(updatedGenre!.name).toBe("Test Genre"); // Should remain unchanged
    });

    it("should search genres", async () => {
      const results = await searchGenres("Test Genre");

      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
      expect(results.some((g) => g.id === testGenre.id)).toBe(true);
    });
  });

  describe("Book Operations", () => {
    it("should create a new book", async () => {
      testBook = await createBook({
        title: "Test Book",
        description: "A book for testing purposes",
        isbn: "1234567890123",
        genre_id: testGenre.id!,
      });

      expect(testBook).toBeDefined();
      expect(testBook.id).toBeDefined();
      expect(testBook.title).toBe("Test Book");
      expect(testBook.isbn).toBe("1234567890123");
      expect(testBook.genre_id).toBe(testGenre.id);
    });

    it("should get book by ID with details", async () => {
      const fetchedBook = await getBookById(testBook.id!);

      expect(fetchedBook).toBeDefined();
      expect(fetchedBook!.id).toBe(testBook.id);
      expect(fetchedBook!.title).toBe("Test Book");
      expect(fetchedBook!.genre_name).toBe("Test Genre");
      expect(Array.isArray(fetchedBook!.authors)).toBe(true);
    });

    it("should get all books", async () => {
      const books = await getAllBooks();

      expect(Array.isArray(books)).toBe(true);
      expect(books.length).toBeGreaterThan(0);
      expect(books.some((b) => b.id === testBook.id)).toBe(true);
    });

    it("should update a book", async () => {
      const updatedBook = await updateBook(testBook.id!, {
        description: "Updated description for testing",
      });

      expect(updatedBook).toBeDefined();
      expect(updatedBook!.description).toBe("Updated description for testing");
      expect(updatedBook!.title).toBe("Test Book"); // Should remain unchanged
    });

    it("should search books", async () => {
      const results = await searchBooks("Test Book");

      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
      expect(results.some((b) => b.id === testBook.id)).toBe(true);
    });

    it("should handle book creation with invalid genre", async () => {
      try {
        await createBook({
          title: "Invalid Book",
          genre_id: 99999, // Non-existent genre
        });
        fail("Should have thrown foreign key constraint error");
      } catch (error) {
        expect(error).toBeInstanceOf(DatabaseError);
      }
    });
  });

  describe("Book-Author Relationship Operations", () => {
    it("should add author to book", async () => {
      const relationship = await addAuthorToBook(
        testBook.id!,
        testAuthor.id!,
        true
      );

      expect(relationship).toBeDefined();
      expect(relationship.book_id).toBe(testBook.id!);
      expect(relationship.author_id).toBe(testAuthor.id!);
      expect(relationship.is_main_author).toBe(true);
    });

    it("should get book with author details", async () => {
      const bookWithAuthors = await getBookById(testBook.id!);

      expect(bookWithAuthors).toBeDefined();
      expect(Array.isArray(bookWithAuthors!.authors)).toBe(true);
      expect(bookWithAuthors!.authors!.length).toBeGreaterThan(0);
      expect(
        bookWithAuthors!.authors!.some((a) => a.id === testAuthor.id)
      ).toBe(true);
    });

    it("should remove author from book", async () => {
      const removed = await removeAuthorFromBook(testBook.id!, testAuthor.id!);
      expect(removed).toBe(true);

      // Verify removal
      const bookWithoutAuthor = await getBookById(testBook.id!);
      expect(bookWithoutAuthor!.authors!.length).toBe(0);
    });
  });

  describe("Error Handling", () => {
    it("should handle non-existent record queries gracefully", async () => {
      const nonExistentAuthor = await getAuthorById(99999);
      const nonExistentGenre = await getGenreById(99999);
      const nonExistentBook = await getBookById(99999);

      expect(nonExistentAuthor).toBeNull();
      expect(nonExistentGenre).toBeNull();
      expect(nonExistentBook).toBeNull();
    });

    it("should handle empty search results", async () => {
      const results = await searchBooks("NonExistentBookTitle12345");
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(0);
    });

    it("should throw validation errors for empty updates", async () => {
      try {
        await updateBook(testBook.id!, {});
        fail("Should have thrown validation error");
      } catch (error) {
        expect(error).toBeInstanceOf(DatabaseError);
        expect((error as DatabaseError).message).toContain(
          "No fields provided for update"
        );
      }
    });
  });

  describe("Delete Operations", () => {
    it("should delete book", async () => {
      const deleted = await deleteBook(testBook.id!);
      expect(deleted).toBe(true);

      // Verify deletion
      const deletedBook = await getBookById(testBook.id!);
      expect(deletedBook).toBeNull();
    });

    it("should delete author", async () => {
      const deleted = await deleteAuthor(testAuthor.id!);
      expect(deleted).toBe(true);

      // Verify deletion
      const deletedAuthor = await getAuthorById(testAuthor.id!);
      expect(deletedAuthor).toBeNull();
    });

    it("should delete genre", async () => {
      const deleted = await deleteGenre(testGenre.id!);
      expect(deleted).toBe(true);

      // Verify deletion
      const deletedGenre = await getGenreById(testGenre.id!);
      expect(deletedGenre).toBeNull();
    });
  });

  // Helper function to clean up test data
  async function cleanupTestData() {
    try {
      // Get all records and clean up test data
      const books = await getAllBooks();
      const authors = await getAllAuthors();
      const genres = await getAllGenres();

      // Delete test books
      for (const book of books) {
        if (book.title?.includes("Test") && book.id) {
          try {
            await deleteBook(book.id);
          } catch (error) {
            // Ignore cleanup errors
          }
        }
      }

      // Delete test authors
      for (const author of authors) {
        if (author.name?.includes("Test") && author.id) {
          try {
            await deleteAuthor(author.id);
          } catch (error) {
            // Ignore cleanup errors
          }
        }
      }

      // Delete test genres
      for (const genre of genres) {
        if (genre.name?.includes("Test") && genre.id) {
          try {
            await deleteGenre(genre.id);
          } catch (error) {
            // Ignore cleanup errors
          }
        }
      }
    } catch (error) {
      // Ignore cleanup errors
    }
  }
});
