import * as dotenv from "dotenv";
import { Pool } from "pg";

// Load environment-specific configuration
const env = process.env.NODE_ENV || "development";
if (env === "test") {
  dotenv.config({ path: ".env.test" });
} else {
  dotenv.config();
}

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

const client = new Pool({
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT || "5432"),
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default client;
