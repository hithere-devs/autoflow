// src/db/schema.ts
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
	id: text('user_id').primaryKey(),
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

export const pipelines = sqliteTable('pipelines', {
	id: text('pipeline_id').primaryKey(),
	userId: text('user_id').references(() => users.id),
	name: text('name').notNull(),
	description: text('description'),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(
		sql`CURRENT_TIMESTAMP`
	),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
		sql`CURRENT_TIMESTAMP`
	),
});

export const nodeTypes = sqliteTable('node_types', {
	id: text('node_type_id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	metadata: text('metadata', { mode: 'json' }).$type<{
		inputs: Array<{
			name: string;
			type: string;
			required: boolean;
		}>;
		outputs: Array<{
			name: string;
			type: string;
		}>;
		configSchema: Record<string, unknown>;
	}>(),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(
		sql`CURRENT_TIMESTAMP`
	),
});

export const nodes = sqliteTable('nodes', {
	id: text('node_id').primaryKey(),
	pipelineId: text('pipeline_id').references(() => pipelines.id),
	nodeTypeId: text('node_type_id').references(() => nodeTypes.id),
	configuration: text('configuration', { mode: 'json' }).$type<
		Record<string, unknown>
	>(),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(
		sql`CURRENT_TIMESTAMP`
	),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
		sql`CURRENT_TIMESTAMP`
	),
});

export const nodeEdges = sqliteTable('node_edges', {
	id: text('edge_id').primaryKey(),
	sourceNodeId: text('source_node_id').references(() => nodes.id),
	targetNodeId: text('target_node_id').references(() => nodes.id),
	pipelineId: text('pipeline_id').references(() => pipelines.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(
		sql`CURRENT_TIMESTAMP`
	),
});

export const executions = sqliteTable('executions', {
	id: text('execution_id').primaryKey(),
	pipelineId: text('pipeline_id').references(() => pipelines.id),
	status: text('status', {
		enum: ['pending', 'running', 'completed', 'failed'],
	}).notNull(),
	triggeredBy: text('triggered_by').notNull(),
	startedAt: integer('started_at', { mode: 'timestamp' }),
	completedAt: integer('completed_at', { mode: 'timestamp' }),
	log: text('log'),
});

export const executionLogs = sqliteTable('execution_logs', {
	id: text('log_id').primaryKey(),
	executionId: text('execution_id').references(() => executions.id),
	nodeId: text('node_id').references(() => nodes.id),
	status: text('status', { enum: ['pending', 'success', 'error'] }).notNull(),
	message: text('message'),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(
		sql`CURRENT_TIMESTAMP`
	),
});

export type User = typeof users.$inferSelect;
export type Pipeline = typeof pipelines.$inferSelect;
export type Node = typeof nodes.$inferSelect;
export type Execution = typeof executions.$inferSelect;
