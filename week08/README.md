# 📚 Book Management System

A full-stack TypeScript application for managing books, authors, and genres with a robust database backend using PostgreSQL.

## 🚀 Features

- **Complete CRUD Operations** for Books, Authors, and Genres
- **Many-to-Many Relationships** between Books and Authors
- **Foreign Key Relationships** between Books and Genres
- **Advanced Search** functionality across all entities
- **Comprehensive Error Handling** with custom DatabaseError class
- **Professional Test Suite** using Jasmine with 100% test coverage
- **Docker Containerization** for isolated dev/test environments
- **Database Migrations** using db-migrate
- **TypeScript** for type safety and better developer experience

## 📦 Project Structure

```
week08/
├── src/
│   ├── data.ts      # CRUD operations and database functions
│   ├── db.ts        # Database connection and configuration
│   ├── demo.ts      # Demonstration scripts
│   └── index.ts     # Main entry point
├── spec/
│   ├── crudSpec.ts  # CRUD operation tests
│   ├── demoSpec.ts  # Demo function tests
│   ├── helpers/     # Test setup and configuration
│   └── support/     # Jasmine configuration
├── migrations/      # Database migration files
├── docker-compose.yml
├── database.json    # Database configuration for dev/test
├── .env            # Development environment variables
├── .env.test       # Test environment variables
└── package.json
```

## 🛠️ Setup Instructions

### Prerequisites

- **Node.js** (v16 or higher)
- **Docker Desktop** (for PostgreSQL containers)

### Environment Setup

Before running the application, you need to set up environment variables:

1. **Copy example environment files:**
   ```bash
   cp .env.example .env
   cp .env.test.example .env.test
   ```

2. **Environment variables explained:**
   
   | Variable | Description | Example Value |
   |----------|-------------|---------------|
   | `NODE_ENV` | Application environment | `development` or `test` |
   | `POSTGRES_HOST` | Database host | `localhost` |
   | `POSTGRES_PORT` | Database port | `5433` (dev), `5434` (test) |
   | `POSTGRES_DB` | Database name | `books_dev`, `books_test` |
   | `POSTGRES_USER` | Database username | `books_user` |
   | `POSTGRES_PASSWORD` | Database password | `booksbooks` |
   | `DEBUG` | Enable debug logging | `true` or `false` (optional) |

3. **Where these values come from:**
   - **Database credentials**: Configured in `docker-compose.yml` 
   - **Ports**: Set in `docker-compose.yml` to avoid conflicts with default PostgreSQL (5432)
   - **Database names**: Defined in `database.json` for db-migrate
   - **User/Password**: Created by Docker containers on first startup

4. **Security Note:**
   - The `.env` and `.env.test` files are automatically ignored by Git (see `.gitignore`)
   - Only `.env.example` and `.env.test.example` are tracked in the repository
   - Never commit actual `.env` files with real credentials to version control
   - For production, use environment-specific values and secure credential management

### Quick Start

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd week08
   npm install
   ```

2. **Set up environment files (REQUIRED for first-time setup):**
   ```bash
   # Copy example environment files
   cp .env.example .env
   cp .env.test.example .env.test
   
   # Verify files were created
   ls -la .env .env.test
   ```
   
   > ⚠️ **Important:** The `.env` files are not tracked in Git for security. You must copy them from the examples before running the application.

3. **Start Docker Desktop** on your system

4. **One-command setup:**
   ```bash
   npm run setup
   ```
   This command will:
   - Start PostgreSQL containers for dev and test databases
   - Run all migrations for both environments
   - Create all necessary tables with proper relationships

5. **Run tests to verify setup:**
   ```bash
   npm test
   ```

## 🐳 Database Configuration

The application uses Docker containers for isolated database environments:

### Development Database (`.env`)
- **Container:** `books-postgres-dev`
- **Port:** `5433` (configured in `POSTGRES_PORT`)
- **Database:** `books_dev` (configured in `POSTGRES_DB`)
- **User:** `books_user` (configured in `POSTGRES_USER`)
- **Password:** `booksbooks` (configured in `POSTGRES_PASSWORD`)

### Test Database (`.env.test`)
- **Container:** `books-postgres-test`
- **Port:** `5434` (configured in `POSTGRES_PORT`)
- **Database:** `books_test` (configured in `POSTGRES_DB`)
- **User:** `books_user` (configured in `POSTGRES_USER`)
- **Password:** `booksbooks` (configured in `POSTGRES_PASSWORD`)

### Environment Files

| File | Purpose | Auto-loaded by | When |
|------|---------|----------------|------|
| `.env` | Development environment | `dotenv` package | `npm start`, `npm run demo` |
| `.env.test` | Test environment | `spec/helpers/setup.ts` | `npm test`, `npm run test:*` |
| `.env.example` | Development template | Manual copy | First-time setup |
| `.env.test.example` | Test template | Manual copy | First-time setup |

### How Environment Loading Works

- **Development**: The `dotenv` package automatically loads `.env` when the application starts
- **Testing**: The Jasmine helper (`spec/helpers/setup.ts`) loads `.env.test` and sets `NODE_ENV=test`
- **db-migrate**: Uses `database.json` which references environment variables from the loaded `.env` files

## 📊 Database Schema

### Tables

1. **authors**
   - `id` (SERIAL PRIMARY KEY)
   - `name` (VARCHAR(255) NOT NULL)
   - `bio` (VARCHAR(255))

2. **genres**
   - `id` (SERIAL PRIMARY KEY)
   - `name` (VARCHAR(255) NOT NULL)
   - `description` (VARCHAR(255))

3. **books**
   - `id` (SERIAL PRIMARY KEY)
   - `title` (VARCHAR(255) NOT NULL)
   - `description` (VARCHAR(255))
   - `isbn` (CHAR(13) UNIQUE)
   - `genre_id` (INT REFERENCES genres(id))

4. **books_authors** (Junction Table)
   - `book_id` (INT REFERENCES books(id))
   - `author_id` (INT REFERENCES authors(id))
   - `is_main_author` (BOOLEAN DEFAULT FALSE)
   - PRIMARY KEY (book_id, author_id)

## 🔧 Available Commands

### Development
```bash
npm start              # Run the main application
npm run demo           # Run CRUD demonstration
npm run setup          # Complete setup (Docker + migrations)
```

### Testing
```bash
npm test               # Run all tests
npm run test:crud      # Run CRUD operation tests only
npm run test:demo      # Run demo function tests only
npm run test:watch     # Watch mode for development
```

### Database Management
```bash
npm run migrate:dev           # Run dev migrations
npm run migrate:test          # Run test migrations
npm run migrate:dev:down      # Rollback dev migrations
npm run migrate:test:down     # Rollback test migrations
npm run migrate:reset:dev     # Reset and rebuild dev database
npm run migrate:reset:test    # Reset and rebuild test database
```

### Docker Management
```bash
npm run docker:up       # Start containers
npm run docker:down     # Stop and remove containers
npm run docker:logs     # View container logs
npm run docker:restart  # Restart containers
```

## 🧪 Testing

The project includes a comprehensive test suite with **29 test specs** covering:

- ✅ **Author CRUD Operations** (6 tests)
- ✅ **Genre CRUD Operations** (5 tests)  
- ✅ **Book CRUD Operations** (6 tests)
- ✅ **Book-Author Relationships** (3 tests)
- ✅ **Error Handling** (3 tests)
- ✅ **Delete Operations** (3 tests)
- ✅ **Demo Functions** (3 tests)

### Test Features
- **Jasmine** test framework with spec reporter
- **Automatic test database cleanup** before and after tests
- **Environment isolation** using `.env.test`
- **TypeScript compilation** validation
- **100% test coverage** of CRUD operations

## 🔌 API Functions

### Author Operations
```typescript
createAuthor(author: Omit<Author, 'id'>): Promise<Author>
getAuthorById(id: number): Promise<Author | null>
getAllAuthors(): Promise<Author[]>
updateAuthor(id: number, updates: Partial<Author>): Promise<Author | null>
deleteAuthor(id: number): Promise<boolean>
searchAuthors(searchTerm: string): Promise<Author[]>
```

### Genre Operations
```typescript
createGenre(genre: Omit<Genre, 'id'>): Promise<Genre>
getGenreById(id: number): Promise<Genre | null>
getAllGenres(): Promise<Genre[]>
updateGenre(id: number, updates: Partial<Genre>): Promise<Genre | null>
deleteGenre(id: number): Promise<boolean>
searchGenres(searchTerm: string): Promise<Genre[]>
```

### Book Operations
```typescript
createBook(book: Omit<Book, 'id'>): Promise<Book>
getBookById(id: number): Promise<BookWithDetails | null>
getAllBooks(): Promise<BookWithDetails[]>
updateBook(id: number, updates: Partial<Book>): Promise<Book | null>
deleteBook(id: number): Promise<boolean>
searchBooks(searchTerm: string): Promise<BookWithDetails[]>
```

### Book-Author Relationships
```typescript
addAuthorToBook(bookId: number, authorId: number, isMainAuthor?: boolean): Promise<BookAuthor>
removeAuthorFromBook(bookId: number, authorId: number): Promise<boolean>
getBookAuthors(bookId: number): Promise<Author[]>
```

## 🛡️ Error Handling

The application includes comprehensive error handling:

- **Custom DatabaseError class** for database-specific errors
- **Foreign key constraint validation**
- **Input validation** for required fields
- **Connection error handling** with detailed logging
- **Graceful error recovery** in tests and demos

## 🌟 Key Features

### Type Safety
- Full TypeScript implementation with strict type checking
- Interface definitions for all database entities
- Type-safe database operations with proper return types

### Database Design
- Proper foreign key relationships
- CASCADE delete operations for data integrity
- Optimized queries with JOIN operations for complex data retrieval

### Professional Development Practices
- Separate development and test environments
- Comprehensive test coverage with automated cleanup
- Docker containerization for consistent environments
- Database migrations for version control of schema changes

## 📈 Performance

- **Optimized database queries** with proper indexing
- **Connection pooling** for efficient database connections
- **Transaction support** for data consistency
- **Prepared statements** to prevent SQL injection

## 🔧 Troubleshooting

### Environment Variable Issues

**Problem:** "Cannot connect to database" errors
```bash
# Solution: Verify environment files exist
ls -la .env .env.test

# If missing, copy from examples:
cp .env.example .env
cp .env.test.example .env.test
```

**Problem:** "Port already in use" errors
```bash
# Solution: Check if ports are available
netstat -an | grep 5433
netstat -an | grep 5434

# Update ports in docker-compose.yml and .env files if needed
```

**Problem:** Tests connecting to wrong database
```bash
# Solution: Verify .env.test is properly configured
cat .env.test

# Should show NODE_ENV=test and POSTGRES_PORT=5434
```

### Docker Issues

**Problem:** Containers won't start
```bash
# Check Docker Desktop is running
docker --version

# Check container logs
npm run docker:logs

# Reset containers
npm run docker:down && npm run docker:up
```

**Problem:** Database connection refused
```bash
# Wait for containers to fully initialize (30-60 seconds)
# Check container status
docker ps

# Verify both containers are "healthy"
npm run docker:logs
```

### Migration Issues

**Problem:** "Table already exists" errors
```bash
# Reset and rebuild databases
npm run migrate:reset:dev
npm run migrate:reset:test
```

**Problem:** Foreign key constraint errors during migration
```bash
# Migrations run in correct order automatically
# If issues persist, check migration files in migrations/ directory
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

## 📄 License

ISC License

---

**Built with ❤️ using TypeScript, PostgreSQL, Docker, and Jasmine**