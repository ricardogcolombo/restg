import { Request, Response } from 'express';

import { ActivityUrlParametersBuilder } from '../../repositories/ActivityUrlParametersBuilder.repository';
import { AccessibilityLevel, Activity, BoredActivity, PriceCategory } from '../entities/activity.entities';
import Logger from '../../helpers/Logger';

const mapBoredAccessibility = (accessibility: number): string => {
  let accessibilityLevel: string;
  if (accessibility <= 0.25) {
    accessibilityLevel = AccessibilityLevel.HIGH;
  } else if (accessibility <= 0.75) {
    accessibilityLevel = AccessibilityLevel.MEDIUM;
  } else {
    accessibilityLevel = AccessibilityLevel.LOW;
  }
  return accessibilityLevel;
};

const mapBoredPrice = (price: number): string => {
  let priceLevel: string;

  if ((price = 0)) {
    priceLevel = PriceCategory.FREE;
  } else if (price <= 0.5) {
    priceLevel = PriceCategory.LOW;
  } else {
    priceLevel = PriceCategory.HIGH;
  }
  return priceLevel;
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
  const url = getActivityQueryParams(req.query);

  let activities;

  try {
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

export default getActivity;
