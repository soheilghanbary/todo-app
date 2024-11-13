import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const userTable = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
});
