import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { db } from '@/db';
import { users } from '@/db/schema';
import { authConfig } from '@/config/auth';
import { eq } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

interface GoogleUserInfo {
	email: string;
	name: string;
	sub: string;
	picture: string;
}

export class AuthService {
	private static oAuth2Client = authConfig.google.oAuth2Client;

	static generateAuthUrl() {
		console.log('Code: I was here');

		return this.oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: [
				'https://www.googleapis.com/auth/userinfo.profile',
				'https://www.googleapis.com/auth/userinfo.email',
			],
			prompt: 'consent',
		});
	}

	static async getGoogleUser(code: string): Promise<GoogleUserInfo> {
		try {
			// Get tokens using the code
			const { tokens } = await this.oAuth2Client.getToken(code);

			// Important: Set credentials on the client
			this.oAuth2Client.setCredentials({
				access_token: tokens.access_token,
				refresh_token: tokens.refresh_token,
			});

			// Use the same client instance to fetch user info
			const userInfoResponse = await this.oAuth2Client.request({
				url: 'https://www.googleapis.com/oauth2/v3/userinfo',
			});

			return userInfoResponse.data as GoogleUserInfo;
		} catch (error) {
			console.error('Error getting Google user:', error);
			throw new Error('Failed to authenticate with Google');
		}
	}

	static async createTokens(userId: string) {
		const accessToken = jwt.sign({ userId }, authConfig.jwt.accessSecret, {
			expiresIn: authConfig.jwt.accessExpiresIn,
		});

		const refreshToken = jwt.sign({ userId }, authConfig.jwt.refreshSecret, {
			expiresIn: authConfig.jwt.refreshExpiresIn,
		});

		return { accessToken, refreshToken };
	}

	static async findOrCreateUser(googleUser: any) {
		const existingUser = await db.query.users.findFirst({
			where: eq(users.email, googleUser.email),
		});

		if (existingUser) {
			return existingUser;
		}

		const newUser = await db
			.insert(users)
			.values({
				id: createId(),
				passwordHash: '',
				email: googleUser.email,
				name: googleUser.name,
				googleId: googleUser.sub,
				picture: googleUser.picture,
			})
			.returning();
		return newUser[0];
	}
}
