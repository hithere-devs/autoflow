import dotenv from 'dotenv';
dotenv.config();
import { redisConfig } from './config/redis';

const { PORT, NODE_ENV = 'development', DB_PATH = 'sqlite.db' } = process.env;

export const config = {
	port: PORT,
	environment: NODE_ENV,
	redis: redisConfig,
	db: {
		path: DB_PATH,
	},
};
