// src/routes/v1/pipeline.routes.ts

import { login } from '@/controllers/auth';
import { Router } from 'express';

const authRoutes = Router();

authRoutes.post('/login', login);

export default authRoutes;
