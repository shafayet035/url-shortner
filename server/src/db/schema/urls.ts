import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const urls = sqliteTable('urls', {
  id: integer('id').primaryKey().unique(),
  url: text('url').notNull(),
  slug: text('slug').unique().notNull(),
  createdAt: text('createdAt')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
