import { AuthController } from '@/controllers/auth';
import { Router } from 'express';

const authRoutes = Router();

authRoutes.get('/login', AuthController.getGoogleAuthUrl);
authRoutes.get('/google/callback', AuthController.handleGoogleCallback);

export default authRoutes;
