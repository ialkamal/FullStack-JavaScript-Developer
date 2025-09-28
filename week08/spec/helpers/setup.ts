import { SpecReporter } from "jasmine-spec-reporter";
import * as dotenv from "dotenv";

// Force test environment when running Jasmine tests
process.env.NODE_ENV = "test";

// Load test environment configuration
dotenv.config({ path: ".env.test" });

// Configure Jasmine spec reporter
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displaySuccessful: true,
      displayFailed: true,
      displayPending: true,
      displayDuration: true,
      displayErrorMessages: true,
    },
    colors: {
      enabled: true,
      successful: "green",
      failed: "red",
      pending: "cyan",
    },
    prefixes: {
      successful: "✓ ",
      failed: "✗ ",
      pending: "* ",
    },
  })
);

// Set longer timeout for database operations
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

console.log("🧪 Jasmine test environment initialized");
console.log(`📊 Using database: ${process.env.POSTGRES_DB}`);
console.log(
  `🔌 Database host: ${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}`
);
