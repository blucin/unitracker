import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

export default {
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/out",
  connectionString: dotenv.config().parsed?.DATABASE_CONNECTION_URL,
} satisfies Config;
