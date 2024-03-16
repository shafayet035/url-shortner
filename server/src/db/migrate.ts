import { migrate } from 'drizzle-orm/libsql/migrator';
import { connection, db } from '..';

async function runMigrations() {
  const result = await migrate(db, { migrationsFolder: './drizzle' });
  console.log('Migration Result, : ', result);
  connection.close();
}

runMigrations();
