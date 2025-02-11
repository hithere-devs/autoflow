import { AuthController } from '@/controllers/auth';
import { verifyAuth } from '@/middlewares/auth';
import { Router } from 'express';

const authRoutes = Router();

authRoutes.get('/login', AuthController.getGoogleAuthUrl);
authRoutes.get('/google/callback', AuthController.handleGoogleCallback);
authRoutes.get('/me', verifyAuth, AuthController.getCurrentUser);

export default authRoutes;
