-- Run these commands after installing PostgreSQL
-- Connect as the postgres superuser and run:

-- Create user for both development and testing
CREATE USER books_user WITH PASSWORD 'booksbooks';

-- Create development database
CREATE DATABASE books_dev OWNER books_user;
GRANT ALL PRIVILEGES ON DATABASE books_dev TO books_user;

-- Create test database
CREATE DATABASE books_test OWNER books_user;
GRANT ALL PRIVILEGES ON DATABASE books_test TO books_user;