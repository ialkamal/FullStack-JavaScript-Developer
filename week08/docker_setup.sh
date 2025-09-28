#!/bin/bash

# Docker setup for PostgreSQL Development and Test environments
# This script sets up two PostgreSQL containers:
# - Development database on port 5433
# - Test database on port 5434

echo "Setting up PostgreSQL containers for development and testing..."

# Stop and remove existing containers if they exist
echo "Cleaning up existing containers..."
docker stop books-postgres-dev books-postgres-test 2>/dev/null || true
docker rm books-postgres-dev books-postgres-test 2>/dev/null || true

# Start Development PostgreSQL container
echo "Starting Development PostgreSQL container..."
docker run --name books-postgres-dev \
  -e POSTGRES_DB=books_dev \
  -e POSTGRES_USER=books_user \
  -e POSTGRES_PASSWORD=booksbooks \
  -p 5433:5432 \
  -d postgres:13

# Start Test PostgreSQL container  
echo "Starting Test PostgreSQL container..."
docker run --name books-postgres-test \
  -e POSTGRES_DB=books_test \
  -e POSTGRES_USER=books_user \
  -e POSTGRES_PASSWORD=booksbooks \
  -p 5434:5432 \
  -d postgres:13

echo "Waiting for containers to be ready..."
sleep 5

# Check if containers are running
if docker ps | grep -q books-postgres-dev && docker ps | grep -q books-postgres-test; then
    echo "✅ Both PostgreSQL containers are running successfully!"
    echo ""
    echo "📊 Container Details:"
    echo "Development DB: localhost:5433 (books_dev)"
    echo "Test DB: localhost:5434 (books_test)" 
    echo "Username: books_user"
    echo "Password: booksbooks"
    echo ""
    echo "🔧 Useful Commands:"
    echo "Stop containers: docker stop books-postgres-dev books-postgres-test"
    echo "Start containers: docker start books-postgres-dev books-postgres-test"
    echo "Remove containers: docker rm books-postgres-dev books-postgres-test"
    echo ""
    echo "🚀 Next steps:"
    echo "1. Run migrations: npm run migrate:dev && npm run migrate:test"
    echo "2. Start your application: npm start"
else
    echo "❌ Error: One or more containers failed to start"
    docker ps -a | grep books-postgres
fi