import { Router } from 'express';
import pipelineRoutes from './piplines';

const v1Router = Router();

v1Router.use('/pipelines', pipelineRoutes);

export default v1Router;
