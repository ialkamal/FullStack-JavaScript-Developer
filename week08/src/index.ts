import { demonstrateCrudOperations, demonstrateErrorHandling } from "./demo";

const main = async () => {
  console.log("� Book Management System");
  console.log("========================\n");

  console.log("🚀 Running complete CRUD demonstration...\n");

  try {
    // Run comprehensive CRUD operations demo
    await demonstrateCrudOperations();

    console.log("\n🧪 Running error handling demonstration...\n");

    // Run error handling demo
    await demonstrateErrorHandling();

    console.log("\n✅ All demonstrations completed successfully!");
    console.log("\n💡 Tip: Use the following commands:");
    console.log("  - npm test          # Run all tests");
    console.log("  - npm run demo      # Run this demo");
    console.log("  - npm run test:crud # Run CRUD tests only");
  } catch (error) {
    console.error("\n❌ Demo failed:", error);
    process.exit(1);
  }
};

// Run the main function
main().catch((error) => {
  console.error("💥 Fatal error:", error);
  process.exit(1);
});
