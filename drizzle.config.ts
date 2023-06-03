import type { Config } from "drizzle-kit";

export default {
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/out",
  connectionString: process.env.DATABASE_URL,
} satisfies Config;
