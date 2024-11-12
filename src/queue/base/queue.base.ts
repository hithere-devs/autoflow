import { Queue, QueueOptions } from 'bullmq';
import { config } from '@/config';

export abstract class BaseQueue extends Queue {
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
