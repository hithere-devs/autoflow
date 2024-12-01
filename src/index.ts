import { createServer } from '@/server';
import { config } from '@/config';
import { db } from './db';
import { sql } from 'drizzle-orm';

async function bootstrap() {
	try {
		const app = await createServer();

		app.listen(config.port, async () => {
			console.log('\n');
			console.log(
				`Server running on port ${config.port} - http://localhost:${config.port}/api/v1\n`
			);
			console.log(
				`Swagger running on http://localhost:${config.port}/api/docs\n`
			);
			console.log(
				`Bull Board running on  http://localhost:${config.port}/admin/queues\n`
			);
		});
	} catch (error) {
		console.error('Failed to start server:', error);
		process.exit(1);
	}
}

bootstrap();
