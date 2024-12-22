import { OAuth2Client } from 'google-auth-library';

const {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	BACKEND_URL,
	JWT_ACCESS_SECRET,
	JWT_REFRESH_SECRET,
	GOOGLE_REDIRECT_URI,
} = process.env;

export const authConfig = {
	google: {
		clientId: GOOGLE_CLIENT_ID!,
		clientSecret: GOOGLE_CLIENT_SECRET!,
		redirectUri: GOOGLE_REDIRECT_URI!,
		oAuth2Client: new OAuth2Client(
			GOOGLE_CLIENT_ID,
			GOOGLE_CLIENT_SECRET,
			GOOGLE_REDIRECT_URI
		),
	},
	jwt: {
		accessSecret: JWT_ACCESS_SECRET!,
		refreshSecret: JWT_REFRESH_SECRET!,
		accessExpiresIn: '15m',
		refreshExpiresIn: '7d',
	},
};
