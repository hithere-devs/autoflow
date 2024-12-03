import { HttpError } from '@/utils/httpResponse';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const { JWT_ACCESS_SECRET } = process.env;

export const verifyAccessToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) {
			return next(new HttpError('No token provided'));
		}

		const decoded = jwt.verify(
			token,
			JWT_ACCESS_SECRET as string
		) as JwtPayload;

		req.user = decoded;
		next();
	} catch (error) {
		next(new HttpError('Please login again'));
	}
};
