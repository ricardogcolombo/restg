import express, { Express, Request, Response, Router } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import Logger from './logger';

dotenv.config();

const port = process.env.PORT || 3000;

const app: Express = express();
app.use(helmet());
app.use(cors());
app.use(morgan('common'));
app.use(express.json());

const router = Router();

app.use('/api/v1', router);

interface activityQueryParams {
  Key?: string;
  Type?: string;
  Participants?: number;
  Price?: string;
  minPrice?: string;
  maxPrice?: string;
  Accessibility?: string;
  maxAccesibility?: string;
  minAccesibility?: string;
}

const getActivity = async (_: Request, res: Response) => {
  res.json({ message: 'bored api middleware' });
};

const badRequestError = (req: Request, res: Response) => {
  Logger.error('Bad Request');
  throw new Error('Bad request');
};

router.get('/', getActivity);
router.all('*', badRequestError);
app.all('*', badRequestError);

app.listen(port, () => {
  console.log('listening at ' + port);
});
