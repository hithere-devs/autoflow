import { Router } from 'express';

import authRoutes from './auth';
import pipelineRoutes from './pipelines';

const v1Router = Router();

// v1Router.use('/auth', authRoutes);
v1Router.use('/pipeline', pipelineRoutes);

export default v1Router;
