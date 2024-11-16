import { Router } from 'express';
import v1Routes from './v1';
import { authRequired } from '@/middlewares/auth';

const apiRouter = Router();

apiRouter.use('/v1', v1Routes);

export default apiRouter;
