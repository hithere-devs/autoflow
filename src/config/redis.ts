export const redisConfig = {
	host: process.env.REDIS_HOST || 'localhost',
	port: parseInt(process.env.REDIS_PORT || '6379'),
	maxRetriesPerRequest: 3,
	enableReadyCheck: false,
	retryStrategy: (times: number) => {
		return Math.min(times * 50, 2000);
	},
};

export const getDefaultOptions = () => {
	// write a good options generation function here
	return {
		attempts: 3,
		backoff: {
			type: 'exponential',
			delay: 1000,
		},
	};
};

export type RedisConfig = typeof redisConfig;
