import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	username: text('username').notNull().unique(),
	email: text('email').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	// subscriptionId: text('subscription_id').references(() => subscriptions.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(
		sql`CURRENT_TIMESTAMP`
	),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
		sql`CURRENT_TIMESTAMP`
	),
});
