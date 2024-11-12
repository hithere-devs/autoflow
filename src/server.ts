// src/server.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { Queue, Worker } from 'bullmq';
// import { errorHandler } from './middleware/error-handler';
// import { requestLogger } from './middleware/request-logger';
// import { configureRoutes } from './routes';
// import { db } from './db';
// import { createNodeWorker } from './queue/workers/node.worker';
// import { createPipelineWorker } from './queue/workers/pipeline.worker';
// import { NodeTypeRegistry } from './registry/node-type-registry';
// import { PipelineRepository } from './repositories/pipeline.repository';
// import { ExecutionRepository } from './repositories/execution.repository';
import { config } from './config/config';

export async function createServer() {
	const app = express();

	// Middleware
	app.use(helmet());
	app.use(cors());
	app.use(express.json());
	// app.use(requestLogger);

	// Initialize repositories
	// const pipelineRepo = new PipelineRepository(db);
	// const executionRepo = new ExecutionRepository(db);

	// Initialize queue
	const nodeQueue = new Queue('node-execution', {
		connection: {
			host: config.redis.host,
			port: config.redis.port,
		},
		defaultJobOptions: {
			attempts: 3,
			backoff: {
				type: 'exponential',
				delay: 1000,
			},
		},
	});

	const pipelineQueue = new Queue('pipeline-execution', {
		connection: {
			host: config.redis.host,
			port: config.redis.port,
		},
	});

	// // Initialize node type registry
	// const nodeTypeRegistry = new NodeTypeRegistry();

	// // Initialize workers
	// const nodeWorker = createNodeWorker(executionRepo, nodeTypeRegistry);
	// const pipelineWorker = createPipelineWorker(
	// 	pipelineQueue,
	// 	nodeQueue,
	// 	executionRepo
	// );

	// // Configure routes
	// configureRoutes(app, {
	// 	pipelineRepo,
	// 	executionRepo,
	// 	nodeQueue,
	// 	pipelineQueue,
	// });

	// Error handling
	// app.use(errorHandler);

	// Graceful shutdown
	const cleanup = async () => {
		console.log('Shutting down...');
		// await nodeWorker.close();
		// await pipelineWorker.close();
		await nodeQueue.close();
		await pipelineQueue.close();
		process.exit(0);
	};

	process.on('SIGINT', cleanup);
	process.on('SIGTERM', cleanup);

	return app;
}
