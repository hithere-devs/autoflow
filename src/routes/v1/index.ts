import { Router } from 'express';
import pipelineRoutes from './piplines';
import { authRequired } from '@/middlewares/auth';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

const v1Router = Router();

v1Router.use('/pipeline', authRequired, pipelineRoutes);

v1Router.get('/login', ClerkExpressRequireAuth(), (req, res) => {
	// @ts-ignore
	res.json(req.auth);
});

export default v1Router;
