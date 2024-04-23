import { Request, Response, Handler } from 'express';

import { ActivityRepository } from '../../repositories/activity.repository';
import { AccessibilityLevel, Activity, BoredActivity, PriceCategory } from '../entities/activity.entities';
import logger from '../../helper/logger';

interface AllowedParams {
  key: string;
  type: string;
  participants: number;
  price: number;
  minprice: number;
  maxprice: number;
  accessibility: number;
  maxaccessibility: number;
  minaccessibility: number;
}

class ActivityProvider {
  private mapBoredAccessibility(accessibility: number): string {
    let accessibilityLevel: string;
    if (accessibility <= 0.25) {
      accessibilityLevel = AccessibilityLevel.HIGH;
    } else if (accessibility <= 0.75) {
      accessibilityLevel = AccessibilityLevel.MEDIUM;
    } else {
      accessibilityLevel = AccessibilityLevel.LOW;
    }

    return accessibilityLevel;
  }

  private mapBoredPrice(price: number): string {
    let priceLevel: string;

    if (price === 0) {
      priceLevel = PriceCategory.FREE;
    } else if (price <= 0.5) {
      priceLevel = PriceCategory.LOW;
    } else {
      priceLevel = PriceCategory.HIGH;
    }

    return priceLevel;
  }

  private mapBoredActivityToActivity(activity: BoredActivity): Activity {
    const accessibility: string = this.mapBoredAccessibility(activity.accessibility);
    const price: string = this.mapBoredPrice(activity.price);

    return {
      ...activity,
      accessibility,
      price
    };
  }

  validateAndCastNumber(value: string): number {
    if (isNaN(Number(value))) {
      logger.error(`validateAndCastNumber:invalid number ${value}`);
      throw Error('invalid arguments');
    }

    return Number(value);
  }

  // FIXME: Any in the params, good candidate for refactor ticket
  private validateAndMapQueryParams(params: any): AllowedParams {
    const { key, type, participants, price, minprice, maxprice, accessibility, maxaccessibility, minaccessibility } = params;
    logger.info('validateAndMapQueryParams:params', params);

    return {
      key,
      type,
      ...(participants && { participants: this.validateAndCastNumber(participants) }),
      ...(price && { price: this.validateAndCastNumber(price) }),
      ...(minprice && { minprice: this.validateAndCastNumber(minprice) }),
      ...(maxprice && { maxprice: this.validateAndCastNumber(maxprice) }),
      ...(accessibility && { accessibility: this.validateAndCastNumber(accessibility) }),
      ...(minaccessibility && { minaccessibility: this.validateAndCastNumber(minaccessibility) }),
      ...(maxaccessibility && { maxaccessibility: this.validateAndCastNumber(maxaccessibility) })
    };
  }

  async getActivity(req: Request, res: Response) {
    logger.info(JSON.stringify(req.query));
    const activityRepository = new ActivityRepository();

    try {
      const { key, type, participants, price, minprice, maxprice, accessibility, maxaccessibility, minaccessibility } =
        this.validateAndMapQueryParams(req.query);

      activityRepository
        .setKey(key)
        .setType(type)
        .setParticipants(participants)
        .setPrice(price)
        .setMinPrice(minprice)
        .setMaxPrice(maxprice)
        .setAccessibility(accessibility)
        .setMaxAccessibility(maxaccessibility)
        .setMinAccessibility(minaccessibility);

      let activity = await activityRepository.getActivity();

      if (activity.accessibility !== undefined && activity.price !== undefined) {
        const mappedActivity = this.mapBoredActivityToActivity(activity);
        res.json(mappedActivity);
      } else {
        res.json(activity);
      }
    } catch (error) {
      logger.error('getActivity: failed to call the api');
      res.json({ error: 'Failed to query due to error in arguments' });
      return;
    }
  }
}

const provider = new ActivityProvider();
const getActivityProvider = (req: Request, res: Response) => {
  return provider.getActivity(req, res);
};

export { ActivityProvider, getActivityProvider };
