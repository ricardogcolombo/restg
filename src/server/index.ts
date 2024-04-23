import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { attachActivityRoutes } from '../application/activity.routes';
import rateLimitMiddleware from './middleware/rate-limit';

const app: Express = express();
app.use(rateLimitMiddleware);
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

app.use(express.json());
attachActivityRoutes(app);

export default app;
