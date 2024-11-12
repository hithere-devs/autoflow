// src/index.ts
import { createServer } from './server';
import { config } from './config/config';

async function bootstrap() {
	try {
		const app = await createServer();

		app.listen(config.port, () => {
			console.log(`Server running on port ${config.port}`);
		});
	} catch (error) {
		console.error('Failed to start server:', error);
		process.exit(1);
	}
}

bootstrap();
