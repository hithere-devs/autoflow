import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { getAuth, verifyToken } from '@clerk/express';
import { Request, Response, NextFunction } from 'express';

export const authRequired = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		ClerkExpressRequireAuth();
		// @ts-ignore
		const auth = req.auth;
		const token = req.headers.authorization?.split(' ')[1];
		if (!auth.userId || !token) {
			throw new Error('UNAUTHORIZED');
		}

		await verifyToken(token as string, {
			secretKey: process.env.CLERK_SECRET_KEY,
		});
		next();
	} catch (error: any) {
		if (error.message !== 'UNAUTHORIZED') {
			console.log(error.message);
		}
		res.status(401).json('UNAUTHORIZED');
	}
};
