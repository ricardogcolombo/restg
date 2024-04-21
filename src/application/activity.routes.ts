import { Router, Express } from 'express';
import Logger from '../helpers/Logger';
import { getActivityProvider } from '../domain/providers/activity.provider';

const router = Router();

const badRequestError = () => {
  Logger.error('Bad Request');
  throw new Error('Bad request');
};

// router.all('*', badRequestError);
router.get('/activity', getActivityProvider);
const attachActivityRoutes = (app: Express) => {
  app.use('/api/v1', router);
};

export { attachActivityRoutes };
