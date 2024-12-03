import { Router } from 'express';
// import pipelineRoutes from './piplines';
import { authRequired } from '@/middlewares/auth';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import authRoutes from './auth';

const v1Router = Router();

// v1Router.use('/pipeline', pipelineRoutes);
v1Router.use('/auth', authRoutes);

export default v1Router;
