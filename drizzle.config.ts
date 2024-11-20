import { Config, defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'sqlite',
	schema: './src/db/schema.ts',
	dbCredentials: {
		url: 'file:sqlite.db',
	},
	out: './drizzle',
}) satisfies Config;
