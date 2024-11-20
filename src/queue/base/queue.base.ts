import { Queue, QueueOptions, JobsOptions } from 'bullmq';
import { config } from '@/config';

export abstract class BaseQueue<TData = any> extends Queue<TData> {
	constructor(name: string, options?: QueueOptions) {
		super(name, {
			connection: {
				host: config.redis.host,
				port: config.redis.port,
			},
			...options,
		});
	}
}
