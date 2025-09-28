import {
  // Authors
  createAuthor,
  getAuthorById,
  getAllAuthors,
  updateAuthor,
  deleteAuthor,

  // Genres
  createGenre,
  getGenreById,
  getAllGenres,
  updateGenre,
  deleteGenre,

  // Books
  createBook,
  getBookById,
  getAllBooks,
  getBooksByGenre,
  getBooksByAuthor,
  updateBook,
  deleteBook,

  // Book-Author Relationships
  addAuthorToBook,
  removeAuthorFromBook,
  getBookAuthors,
  updateAuthorBookRelation,

  // Search Operations
  searchBooks,
  searchAuthors,
  searchGenres,

  // Types
  Author,
  Genre,
  Book,
  BookWithDetails,
  DatabaseError,
} from "./data";

// Example usage of CRUD operations
export const demonstrateCrudOperations = async () => {
  try {
    console.log("🚀 Starting CRUD operations demonstration...\n");

    // ========== AUTHORS ==========
    console.log("📚 Author Operations:");

    // Create authors
    const author1 = await createAuthor({
      name: "J.K. Rowling",
      bio: "British author best known for the Harry Potter series",
    });
    console.log("✅ Created author:", author1);

    const author2 = await createAuthor({
      name: "George R.R. Martin",
      bio: "American novelist and short story writer, known for A Song of Ice and Fire",
    });
    console.log("✅ Created author:", author2);

    // Get all authors
    const allAuthors = await getAllAuthors();
    console.log("📖 All authors:", allAuthors);

    // Update author
    if (author1.id) {
      const updatedAuthor = await updateAuthor(author1.id, {
        bio: "British author, philanthropist, and screenwriter best known for the Harry Potter series",
      });
      console.log("✏️ Updated author:", updatedAuthor);
    }

    // ========== GENRES ==========
    console.log("\n🎭 Genre Operations:");

    // Create genres
    const fantasyGenre = await createGenre({
      name: "Fantasy",
      description: "Fiction involving magical or supernatural elements",
    });
    console.log("✅ Created genre:", fantasyGenre);

    const scifiGenre = await createGenre({
      name: "Science Fiction",
      description:
        "Fiction dealing with futuristic concepts and advanced technology",
    });
    console.log("✅ Created genre:", scifiGenre);

    // ========== BOOKS ==========
    console.log("\n📖 Book Operations:");

    // Create books
    const book1 = await createBook({
      title: "Harry Potter and the Philosopher's Stone",
      description:
        "A young wizard discovers his magical heritage on his 11th birthday",
      isbn: "9780747532699",
      genre_id: fantasyGenre.id!,
    });
    console.log("✅ Created book:", book1);

    const book2 = await createBook({
      title: "A Game of Thrones",
      description:
        "The first book in the epic fantasy series A Song of Ice and Fire",
      isbn: "9780553103540",
      genre_id: fantasyGenre.id!,
    });
    console.log("✅ Created book:", book2);

    // ========== BOOK-AUTHOR RELATIONSHIPS ==========
    console.log("\n🔗 Book-Author Relationship Operations:");

    // Add authors to books
    if (book1.id && author1.id) {
      await addAuthorToBook(book1.id, author1.id, true); // Main author
      console.log("✅ Added J.K. Rowling as main author to Harry Potter");
    }

    if (book2.id && author2.id) {
      await addAuthorToBook(book2.id, author2.id, true); // Main author
      console.log(
        "✅ Added George R.R. Martin as main author to Game of Thrones"
      );
    }

    // Get book with details (including authors and genre)
    if (book1.id) {
      const bookWithDetails = await getBookById(book1.id);
      console.log(
        "📚 Book with details:",
        JSON.stringify(bookWithDetails, null, 2)
      );
    }

    // ========== SEARCH OPERATIONS ==========
    console.log("\n🔍 Search Operations:");

    // Search books
    const searchResults = await searchBooks("Harry");
    console.log('🔎 Books matching "Harry":', searchResults);

    // Search authors
    const authorSearchResults = await searchAuthors("Rowling");
    console.log('🔎 Authors matching "Rowling":', authorSearchResults);

    // ========== QUERIES BY RELATIONSHIP ==========
    console.log("\n📊 Relationship Queries:");

    // Get books by genre
    if (fantasyGenre.id) {
      const fantasyBooks = await getBooksByGenre(fantasyGenre.id);
      console.log("🎭 Fantasy books:", fantasyBooks);
    }

    // Get books by author
    if (author1.id) {
      const rowlingBooks = await getBooksByAuthor(author1.id);
      console.log("👤 Books by J.K. Rowling:", rowlingBooks);
    }

    // Get all books with details
    const allBooks = await getAllBooks();
    console.log(
      "📚 All books with details:",
      JSON.stringify(allBooks, null, 2)
    );

    console.log("\n✨ CRUD operations demonstration completed successfully!");
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error("❌ Database Error:", error.message);
      console.error("Original Error:", error.originalError);
    } else {
      console.error("❌ Unexpected Error:", error);
    }
  }
};

// Example of error handling
export const demonstrateErrorHandling = async () => {
  try {
    console.log("\n🛡️ Error Handling Demonstration:");

    // Try to get a non-existent record
    const nonExistentBook = await getBookById(99999);
    console.log("Non-existent book result:", nonExistentBook); // Should be null

    // Try to update with no fields
    try {
      await updateBook(1, {});
    } catch (error) {
      if (error instanceof DatabaseError) {
        console.log("✅ Caught expected validation error:", error.message);
      }
    }

    // Try to create a book with invalid genre_id (foreign key constraint)
    try {
      await createBook({
        title: "Test Book",
        genre_id: 99999, // Non-existent genre
      });
    } catch (error) {
      if (error instanceof DatabaseError) {
        console.log("✅ Caught expected foreign key constraint error");
      }
    }
  } catch (error) {
    console.error("❌ Error in error handling demo:", error);
  }
};

// Cleanup function for demo purposes
export const cleanupDemo = async () => {
  try {
    console.log("\n🧹 Cleaning up demo data...");

    // In a real application, you might want to be more selective about cleanup
    // This is just for demo purposes

    const allBooks = await getAllBooks();
    for (const book of allBooks) {
      if (book.id) {
        await deleteBook(book.id);
      }
    }

    const allAuthors = await getAllAuthors();
    for (const author of allAuthors) {
      if (author.id) {
        await deleteAuthor(author.id);
      }
    }

    const allGenres = await getAllGenres();
    for (const genre of allGenres) {
      if (genre.id) {
        await deleteGenre(genre.id);
      }
    }

    console.log("✅ Cleanup completed");
  } catch (error) {
    console.error("❌ Error during cleanup:", error);
  }
};
