export const config = {
	port: process.env.PORT || 3000,
	environment: process.env.NODE_ENV || 'development',
	redis: {
		host: process.env.REDIS_HOST || 'localhost',
		port: parseInt(process.env.REDIS_PORT || '6379'),
	},
	db: {
		path: process.env.DB_PATH || 'sqlite.db',
	},
};
