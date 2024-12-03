import { OAuth2Client } from 'google-auth-library';

export const getGoogleClient = () => {
	return new OAuth2Client(
		process.env.GOOGLE_CLIENT_ID,
		process.env.GOOGLE_CLIENT_SECRET
	);
};
