# Docker setup for PostgreSQL
# Run this command to start a PostgreSQL container with the required user and database

docker run --name books-postgres \
  -e POSTGRES_DB=books_dev \
  -e POSTGRES_USER=books_user \
  -e POSTGRES_PASSWORD=booksbooks \
  -p 5432:5432 \
  -d postgres:13

# To stop the container later:
# docker stop books-postgres

# To start it again:
# docker start books-postgres