import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { getAuth, verifyToken } from '@clerk/express';
import { Request, Response, NextFunction } from 'express';

// Will Setup Auth Later Cause This is a problem at this moment
// Setting up clerk with both next and nodejs is not working, cause If I want to leverage these apis somewhere else in future anyways i would need to setup the authentication seperately for that case! So will figure this out later.
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
