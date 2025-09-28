import "./helpers/setup";
import {
  demonstrateCrudOperations,
  demonstrateErrorHandling,
  cleanupDemo,
} from "../src/demo";

describe("Demo Functions", () => {
  describe("CRUD Demonstration", () => {
    it("should run complete CRUD demonstration without errors", async () => {
      // Capture console output to verify it runs
      const consoleSpy = spyOn(console, "log");

      await demonstrateCrudOperations();

      // Verify some console output was generated
      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy.calls.count()).toBeGreaterThan(0);

      // Check for key demonstration messages
      const logMessages = consoleSpy.calls
        .allArgs()
        .map((args) => args.join(" "));
      expect(
        logMessages.some((msg) =>
          msg.includes("Starting CRUD operations demonstration")
        )
      ).toBe(true);
      expect(
        logMessages.some((msg) =>
          msg.includes("CRUD operations demonstration completed successfully")
        )
      ).toBe(true);
    });

    it("should run error handling demonstration", async () => {
      const consoleSpy = spyOn(console, "log");

      await demonstrateErrorHandling();

      expect(consoleSpy).toHaveBeenCalled();

      // Check for error handling demonstration messages
      const logMessages = consoleSpy.calls
        .allArgs()
        .map((args) => args.join(" "));
      expect(
        logMessages.some((msg) => msg.includes("Error Handling Demonstration"))
      ).toBe(true);
    });

    it("should clean up demo data", async () => {
      const consoleSpy = spyOn(console, "log");

      await cleanupDemo();

      expect(consoleSpy).toHaveBeenCalled();

      // Check for cleanup messages
      const logMessages = consoleSpy.calls
        .allArgs()
        .map((args) => args.join(" "));
      expect(
        logMessages.some((msg) => msg.includes("Cleaning up demo data"))
      ).toBe(true);
    });
  });

  // Clean up after all demo tests
  afterAll(async () => {
    await cleanupDemo();
  });
});
