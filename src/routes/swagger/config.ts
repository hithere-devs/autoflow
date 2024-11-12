// src/routes/swagger/config.ts
import { config } from '@/config';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'AutoFlow API Documentation',
		version: '1.0.0',
		description: 'API documentation for AutoFlow platform',
		contact: {
			name: 'API Support',
			url: 'https://github.com/hithere-devs/autoflow',
		},
	},
	servers: [
		{
			url: `http://localhost:${config.port}`,
			description: 'Development server',
		},
	],
	components: {
		securitySchemes: {
			BearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
		},
	},
};

const options = {
	swaggerDefinition,
	apis: ['./src/routes/**/*.ts'], // Path to the API docs
};

export const swaggerSpec = swaggerJSDoc(options);

export const swaggerUiOptions = {
	customCss: ``,
	customSiteTitle: 'AutoFlow API Documentation',
};
