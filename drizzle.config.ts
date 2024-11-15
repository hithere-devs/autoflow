import { Config, defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'sqlite',
	schema: './src/db/schema.ts',
	dbCredentials: {
		url: 'sqlite.db',
	},
}) satisfies Config;
