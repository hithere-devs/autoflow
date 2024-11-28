import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { aiNodeQueue, createTestWorker, testQueue } from '@/queue';
import { setupBullBoard } from '@/config/bull-board';
import { errorHandler } from '@/middlewares/error-handler';
import { swaggerRoutes } from '@/routes/swagger';
import apiRouter from '@/routes';
import { clerkMiddleware } from '@clerk/express';
import { authRequired } from './middlewares/auth';
import { textNodeQueue } from './queue/nodes/text-node/text-node.queue';
import { workerInitializer } from './queue/nodes/worker.initializer';

export async function createServer() {
	const app = express();

	// Security
	app.use(helmet());

	// CORS
	app.use(
		cors({
			origin: [`${process.env.CLIENT_URL}`], // Allow frontend urls
			credentials: true, // Required for cookies/auth headers
			methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
			allowedHeaders: ['Content-Type', 'Authorization'],
		})
	);

	// Body parser
	app.use(express.json());

	// Setup Swagger
	app.use('/api/docs', swaggerRoutes);

	// Setup Bull Board
	const bullBoardAdapter = setupBullBoard();
	app.use('/admin/queues', bullBoardAdapter.getRouter());

	// Initialize test queue workers
	workerInitializer();

	// Test Endpoint for Queue
	app.get('/test-job', async (req, res) => {
		const job = await aiNodeQueue.addProcessing({
			nodeId: 'ai-node-1',
		});
		// const job = await textNodeQueue.addProcessing({
		// 	nodeId: 'text-node-1',
		// 	input: {
		// 		name: 'Azhar Malik',
		// 		company: 'Autoflow',
		// 		role: 'Software Engineer',
		// 	},
		// });
		res.json({ jobId: job.id });
	});

	// auth
	app.use(
		clerkMiddleware({
			authorizedParties: ['http://localhost:3000'],
		})
	);

	const serverChecks = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		console.log('Running server checks...');
		// Add server checks here
		// e.g. check if database connection is established
		console.log('Server checks passed!');
		next();
	};

	// Health Check Enpoint
	app.get('/admin', serverChecks, async (req, res) => {
		res.send({
			status: 200,
			message: 'Server is up and running with all checks passed!',
		});
	});

	// setup request logging
	app.use(morgan('dev'));

	// Configure routes
	app.use('/api', apiRouter);

	// Error handling
	app.use(errorHandler);

	// Graceful shutdown
	const cleanup = async () => {
		console.log('Shutting down...');
		process.exit(0);
	};

	process.on('SIGINT', cleanup);
	process.on('SIGTERM', cleanup);

	return app;
}
