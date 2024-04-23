import { Router, Express } from 'express';
import { getActivityProvider } from '../domain/providers/activity.provider';

const router = Router();

router.get('/activity', getActivityProvider);

const attachActivityRoutes = (app: Express) => {
  app.use('/api/v1', router);
};

export { attachActivityRoutes };
