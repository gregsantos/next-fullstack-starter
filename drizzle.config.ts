import type { Config } from "drizzle-kit";
import { env } from "./env.mjs";

export default {
  schema: "./db/schema/*",
  out: "./db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
} satisfies Config; 