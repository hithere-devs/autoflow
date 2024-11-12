import { Queue } from 'bullmq';
import { config } from '@/config';
import { getDefaultOptions } from '@/config/redis';

export const testQueue = new Queue('test-queue', {
	connection: {
		host: config.redis.host,
		port: config.redis.port,
	},
	defaultJobOptions: getDefaultOptions(),
});
