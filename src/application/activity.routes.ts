import { Router, Express } from 'express';
import getActivity from '../domain/providers/activity.provider';
import Logger from '../helpers/Logger';

const router = Router();

const badRequestError = () => {
  Logger.error('Bad Request');
  throw new Error('Bad request');
};

// router.all('*', badRequestError);
router.get('/activity', getActivity);
const attachActivityRoutes = (app: Express) => {
  app.use('/api/v1', router);
};

export { attachActivityRoutes };
