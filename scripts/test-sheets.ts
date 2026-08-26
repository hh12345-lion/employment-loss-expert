/**
 * Run: npx dotenv-cli -e .env.local -- npx tsx scripts/test-sheets.ts
 */
import { appendRow } from "../lib/google-sheets";

async function test() {
  const result = await appendRow([
    new Date().toISOString(),
    "EmploymentLossExpert",
    "Test User",
    "test@example.com",
    "07000000000",
    "contact",
    "Connection test from scripts/test-sheets.ts",
  ]);
  console.log("OK:", result.updatedRange);
}

test().catch((err) => {
  console.error("FAILED:", err.message || err);
  process.exit(1);
});
