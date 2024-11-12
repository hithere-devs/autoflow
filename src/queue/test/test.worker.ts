import { Worker, Job } from 'bullmq';
import { config } from '../../config';

export interface TestJobData {
	message: string;
}

export function createTestWorker() {
	const worker = new Worker(
		'test-queue',
		async (job: Job<TestJobData>) => {
			console.log(`Processing job ${job.id}`);
			console.log(`Message: ${job.data.message}`);
			// Simulate some work
			await new Promise((resolve) => setTimeout(resolve, 1000));
			return { processed: true, message: job.data.message };
		},
		{
			connection: {
				host: config.redis.host,
				port: config.redis.port,
			},
			concurrency: 5,
		}
	);

	worker.on('completed', (job) => {
		console.log(`Job ${job.id} completed`);
	});

	worker.on('failed', (job, err) => {
		console.error(`Job ${job?.id} failed:`, err);
	});

	return worker;
}
