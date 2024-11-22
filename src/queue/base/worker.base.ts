// src/queue/base/worker.base.ts
import { Worker, WorkerOptions, Job } from 'bullmq';
import { config } from '@/config';

export abstract class BaseWorker<TData = any, TResult = any> extends Worker {
	constructor(
		queueName: string,
		processor: (job: Job<TData>) => Promise<TResult>,
		options?: WorkerOptions
	) {
		super(queueName, processor, {
			connection: {
				host: config.redis.host,
				port: config.redis.port,
			},
			concurrency: 5,
			...options,
		});

		this.on('completed', (job) => {
			console.log(`Job ${job.id} completed in queue ${queueName}`);
		});

		this.on('failed', (job, error) => {
			console.error(`Job ${job?.id} failed in queue ${queueName}:`, error);
		});
	}
}
