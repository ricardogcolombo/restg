import { Router, Express } from 'express';
import { getActivityProvider } from '../domain/providers/activity.provider';
import logger from '../helper/logger';

const router = Router();

const badRequestError = () => {
  logger.error('Bad Request');
  throw new Error('Bad request');
};

// router.all('*', badRequestError);
router.get('/activity', getActivityProvider);
const attachActivityRoutes = (app: Express) => {
  app.use('/api/v1', router);
};

export { attachActivityRoutes };
