import { Router, Express } from 'express';
import { getActivityProvider, postUserActivityProvider, provider } from '../domain/providers/activity.provider';

const router = Router();

router.get('/activity', getActivityProvider);
router.post('/user', postUserActivityProvider);

const attachActivityRoutes = (app: Express) => {
  app.use('/api/v1', router);
};

export { attachActivityRoutes };
