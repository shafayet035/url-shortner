import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './src/db/schema/*',
  out: './src/db/drizzle',
  driver: 'turso',
  dbCredentials: {
    url: process.env.DB_URL as string,
    authToken: process.env.DB_AUTH_TOKEN as string,
  },
} satisfies Config;
