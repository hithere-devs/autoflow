// src/controllers/auth.controller.ts
import { AuthService } from '@/services/auth';
import { Request, Response } from 'express';

export class AuthController {
	static async getGoogleAuthUrl(req: Request, res: Response) {
		const url = AuthService.generateAuthUrl();
		res.json({ url });
	}

	static async handleGoogleCallback(req: Request, res: Response) {
		try {
			const { code } = req.query;
			if (!code || typeof code !== 'string') {
				throw new Error('Authorization code required');
			}
			console.log('Code:', code);
			const googleUser = await AuthService.getGoogleUser(code);
			const user = await AuthService.findOrCreateUser(googleUser);
			const { accessToken, refreshToken } = await AuthService.createTokens(
				user.id
			);

			res.cookie('access_token', accessToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 15 * 60 * 1000, // 15 minutes
			});

			res.cookie('refresh_token', refreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
			});

			res.redirect(`${process.env.CLIENT_URL}/auth/success`);
		} catch (error) {
			console.log(error);
			res.redirect(`${process.env.CLIENT_URL}/auth/error`);
		}
	}
}
