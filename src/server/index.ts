import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { attachActivityRoutes } from '../application/activity.routes';

const app: Express = express();
app.use(helmet());
app.use(cors());
app.use(morgan('common'));
app.use(express.json());
attachActivityRoutes(app);

export default app;
