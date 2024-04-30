import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { attachActivityRoutes } from '../application/activity.routes';
import rateLimitMiddleware from './middleware/rate-limit';
import logger from '../helper/logger';

const app: Express = express();
if (process.env.NODE_ENV === 'production') {
  logger.info('RATE LIMIT ENABLED');
  app.use(rateLimitMiddleware);
}
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('common'));
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  return res.json({
    status: 'error',
    statusCode: 404,
    error: 'route does not exists',
    data: []
  });
});

attachActivityRoutes(app);

export default app;
