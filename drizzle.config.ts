import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './server/db/schema.ts',
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
