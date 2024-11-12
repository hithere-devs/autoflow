// src/server.ts
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createTestWorker, testQueue } from '@/queue';
import { setupBullBoard } from '@/config/bull-board';
import { errorHandler } from '@/middlewares/error-handler';
import { swaggerRoutes } from '@/routes/swagger';
import apiRouter from '@/routes';

export async function createServer() {
	const app = express();

	// Middleware
	app.use(helmet());
	app.use(cors());
	app.use(express.json());
	app.use('/api/docs', swaggerRoutes);

	// Setup Bull Board
	const bullBoardAdapter = setupBullBoard();
	app.use('/admin/queues', bullBoardAdapter.getRouter());

	// Initialize test queue worker
	const testWorker = createTestWorker();

	// Test Endpoint for Queue
	app.post('/test-job', async (req, res) => {
		const job = await testQueue.add('test', {
			message: req.body.message || 'Hello from test job!',
		});
		res.json({ jobId: job.id });
	});

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
		await testWorker.close();
		await testQueue.close();
		process.exit(0);
	};

	process.on('SIGINT', cleanup);
	process.on('SIGTERM', cleanup);

	return app;
}
