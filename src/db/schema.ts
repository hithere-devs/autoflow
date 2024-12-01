// src/db/schema.ts
import {
	pgTable,
	text,
	integer,
	boolean,
	jsonb,
	timestamp,
	uniqueIndex,
	varchar,
} from 'drizzle-orm/pg-core';
// import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
	id: text('user_id').primaryKey(),
	email: text('email').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});

export const pipelines = pgTable(
	'pipelines',
	{
		id: text('pipeline_id').primaryKey(),
		userId: text('user_id').references(() => users.id),
		name: text('name').notNull(),
		description: text('description'),
		published: boolean('published').default(false),
		metadata: jsonb('metadata'),
		createdAt: timestamp('created_at').defaultNow(),
		updatedAt: timestamp('updated_at').defaultNow(),
	},
	(table) => ({
		nameUserIdx: uniqueIndex('pipeline_with_name_exists').on(
			table.userId,
			table.name
		),
	})
);

export const nodeTypes = pgTable('node_types', {
	id: text('node_type_id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	metadata: jsonb('metadata').$type<{
		inputs: Array<{
			name: string;
			type: string;
			required: boolean;
		}>;
		outputs: Array<{
			name: string;
			type: string;
		}>;
		configSchema: Record<string, string>;
	}>(),
	createdAt: timestamp('created_at').defaultNow(),
});

export const nodes = pgTable('nodes', {
	id: text('node_id').primaryKey(),
	pipelineId: text('pipeline_id').references(() => pipelines.id),
	nodeTypeId: text('node_type_id').references(() => nodeTypes.id),
	position: integer('position').notNull().default(0),
	configuration: jsonb('configuration').$type<Record<string, string>>(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});

export const nodeEdges = pgTable('node_edges', {
	id: text('edge_id').primaryKey(),
	sourceNodeId: text('source_node_id').references(() => nodes.id),
	targetNodeId: text('target_node_id').references(() => nodes.id),
	pipelineId: text('pipeline_id').references(() => pipelines.id),
	createdAt: timestamp('created_at').defaultNow(),
});

export const executions = pgTable('executions', {
	id: text('execution_id').primaryKey(),
	pipelineId: text('pipeline_id')
		.references(() => pipelines.id)
		.notNull(),
	status: varchar('status', {
		enum: ['pending', 'running', 'completed', 'failed'],
	}).notNull(),
	triggeredBy: text('triggered_by').notNull(),
	startedAt: timestamp('started_at').defaultNow(),
	completedAt: timestamp('completed_at'),
	log: text('log'),
});

export const executionLogs = pgTable('execution_logs', {
	id: text('log_id').primaryKey(),
	executionId: text('execution_id').references(() => executions.id),
	nodeId: text('node_id').references(() => nodes.id),
	status: varchar('status', {
		enum: ['pending', 'success', 'error'],
	}).notNull(),
	message: text('message'),
	createdAt: timestamp('created_at').defaultNow(),
});

// Relations remain the same
export const usersRelations = relations(users, ({ many }) => ({
	pipelines: many(pipelines),
}));

export const pipelinesRelations = relations(pipelines, ({ one, many }) => ({
	user: one(users, {
		fields: [pipelines.userId],
		references: [users.id],
	}),
	nodes: many(nodes),
	nodeEdges: many(nodeEdges),
	executions: many(executions),
}));

export const nodesRelations = relations(nodes, ({ one }) => ({
	pipeline: one(pipelines, {
		fields: [nodes.pipelineId],
		references: [pipelines.id],
	}),
}));

export const nodeEdgesRelations = relations(nodeEdges, ({ one }) => ({
	pipeline: one(pipelines, {
		fields: [nodeEdges.pipelineId],
		references: [pipelines.id],
	}),
}));

export const executionsRelations = relations(executions, ({ one }) => ({
	pipeline: one(pipelines, {
		fields: [executions.pipelineId],
		references: [pipelines.id],
	}),
}));

export type User = typeof users.$inferSelect;
export type Pipeline = typeof pipelines.$inferSelect;
export type Node = typeof nodes.$inferSelect;
export type Execution = typeof executions.$inferSelect;
