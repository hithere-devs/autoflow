import { createServer } from '@/server';
import { config } from '@/config';

async function bootstrap() {
	try {
		const app = await createServer();

		app.listen(config.port, () => {
			console.log(`Server running on port ${config.port}`);
			console.log(
				`Bull Board running on http://localhost:${config.port}/admin/queues`
			);
			console.log(
				`Swagger running on http://localhost:${config.port}/api/docs`
			);
		});
	} catch (error) {
		console.error('Failed to start server:', error);
		process.exit(1);
	}
}

bootstrap();
