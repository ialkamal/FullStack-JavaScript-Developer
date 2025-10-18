-- Run these commands after installing PostgreSQL
-- Connect as the postgres superuser and run:

CREATE USER books_user WITH PASSWORD 'booksbooks';
CREATE DATABASE books_dev OWNER books_user;
GRANT ALL PRIVILEGES ON DATABASE books_dev TO books_user;