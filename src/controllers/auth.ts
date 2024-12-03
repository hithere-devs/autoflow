import { db } from '@/db';
import { Success, HttpError } from '@/utils/httpResponse';
import { createId } from '@paralleldrive/cuid2';
import { getGoogleClient } from '@/lib/auth';
import { TokenPayload } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
const { GOOGLE_CLIENT_ID, SECRET } = process.env;

const client = getGoogleClient();

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		console.log(req.headers.authorization);
		const token = req.headers.authorization as string;
		const ticket = await client.verifyIdToken({
			idToken: token.slice(7),
			audience: GOOGLE_CLIENT_ID as string,
		});
		const payload = ticket.getPayload() as TokenPayload;
		console.log(payload);
		if (payload.aud != GOOGLE_CLIENT_ID) {
			throw new HttpError('Unauthorized');
		}
		const { email, name } = payload;
		const authToken = jwt.sign({ email, name }, SECRET as string);
		const response = new Success('Login Successful', { authToken });
		res.status(response.statusCode).json(response);
	} catch (error: any) {
		next(error);
	}
};
