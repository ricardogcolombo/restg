import express, { Express, Request, Response, Router, RequestHandler } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import Logger from './Logger';
import { ActivityUrlParametersBuilder } from './ActivityUrlParametersBuilder';

dotenv.config();

const port = process.env.PORT || 3000;

const app: Express = express();
app.use(helmet());
app.use(cors());
app.use(morgan('common'));
app.use(express.json());

const router = Router();

app.use('/api/v1', router);

interface BoredActivity {
  activity: string;
  accessibility: number;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
}

interface Activity {
  activity: string;
  accessibility: string;
  type: string;
  participants: number;
  price: string;
  link: string;
  key: string;
}

const validatedActivityParams = (params: any): void => {
  const { key, type, participants, price, minprice, maxprice, accessibility, maxaccesibility, minaccesibility } = params;
};

const getActivityQueryParams = (params: any): string => {
  const { key, type, participants, price, minprice, maxprice, accessibility, maxaccesibility, minaccesibility } = params;
  const queryParams = new ActivityUrlParametersBuilder();

  queryParams
    .setKey(key)
    .setType(type)
    .setParticipants(participants)
    .setPrice(price)
    .setMinPrice(minprice)
    .setMaxPrice(maxprice)
    .setAccessibility(accessibility)
    .setMaxAccessibility(maxaccesibility)
    .setMinAccessibility(minaccesibility);

  return queryParams.getUrl();
};

enum accesibilityLevels {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

const mapBoredAccessibility = (accessibility: number): string => {
  let accessibilityLevel: string;
  if (accessibility <= 0.25) {
    accessibilityLevel = 'HIGH';
  } else if (accessibility <= 0.75) {
    accessibilityLevel = 'MEDIUM';
  } else {
    accessibilityLevel = 'LOW';
  }
  return accessibilityLevel;
};

const mapBoredPrice = (price: number): string => {
  let priceLevel: string;

  if ((price = 0)) {
    priceLevel = 'FREE';
  } else if (price <= 0.5) {
    priceLevel = 'LOW';
  } else {
    priceLevel = 'HIGH';
  }
  return priceLevel;
};

const mapBoredActivityToActivity = (activity: BoredActivity): Activity => {
  const accessibility: string = mapBoredAccessibility(activity.accessibility);
  const price: string = mapBoredPrice(activity.price);

  return {
    ...activity,
    accessibility,
    price
  };
};

const getActivity = async (req: Request, res: Response) => {
  const { key, type, participants, price, minprice, maxprice, accessibility, maxaccesibility, minaccesibility } = req.query;

  validatedActivityParams(req.query);
  const urlParams = getActivityQueryParams(req.query);

  let activities;

  try {
    const url = `http://www.boredapi.com/api/activity?${urlParams}`;
    Logger.info(`calling ${url}`);
    activities = await fetch(url)
      .then((activity) => activity.json())
      .then(mapBoredActivityToActivity);
  } catch (error) {
    Logger.error('Failed to fetch from boredapi/activity');
    throw error;
  }

  res.json(activities);
};

const badRequestError = (req: Request, res: Response) => {
  Logger.error('Bad Request');
  throw new Error('Bad request');
};

router.get('/activity', getActivity);
router.all('*', badRequestError);
app.all('*', badRequestError);

app.listen(port, () => {
  console.log('listening at ' + port);
});
