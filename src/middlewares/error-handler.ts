// src/middleware/error-handler.ts
import { HttpError } from '@/utils/httpResponse';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export class ApiError extends Error {
	constructor(
		public status: boolean,
		public statusCode: number,
		message: string,
		public errors?: any
	) {
		super(message);
		this.status = false;
		this.name = 'ApiError';
	}
}

export const errorHandler: ErrorRequestHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	console.error(err);

	if (err instanceof ApiError || err instanceof HttpError) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
			errors: err.errors || undefined,
		});
		return;
	}

	res.status(500).json({
		status: 'error',
		message: 'Internal Server Error',
		...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
	});
	return;
};
