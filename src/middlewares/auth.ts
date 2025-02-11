// src/middlewares/auth.middleware.ts
import { authConfig } from '@/config/auth';
import { HttpError } from '@/utils/httpResponse';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
	const accessToken = req.cookies['access_token'];

	if (!accessToken) {
		res.status(401).json({ message: 'No token provided' });
		// throw new Error('No token provided');
	}

	try {
		const decoded = jwt.verify(accessToken, authConfig.jwt.accessSecret);
		// @ts-ignore
		req.user = decoded;
		next();
	} catch (err) {
		const errResponse = new HttpError('Invalid token', err, 401);
		res.status(errResponse.statusCode).json(errResponse);
	}
};
