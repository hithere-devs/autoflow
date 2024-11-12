// db/migrate.ts
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

async function migrate() {
	const sqlite = new Database('sqlite.db');
	const db = drizzle(sqlite, { schema });

	// Run migrations here
	// await db.schema.createTables();
}

migrate()
	.then(() => {
		console.log('Database migration complete');
		process.exit(0);
	})
	.catch((err) => {
		console.error('Error running database migration:', err);
		process.exit(1);
	});
