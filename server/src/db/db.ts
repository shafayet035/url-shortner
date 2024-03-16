import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

export default function initializeDB() {
  const connection = createClient({
    url: `${process.env.DB_URL}`,
    authToken: process.env.DB_AUTH_TOKEN as string,
  });

  const db = drizzle(connection);

  return { db, connection };
}
