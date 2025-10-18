/* Replace with your SQL commands */
CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  email      VARCHAR(255),
  hash       VARCHAR(255)
);