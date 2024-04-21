import { Request, Response, Handler } from 'express';

import { ActivityRepository } from '../../repositories/activity.repository';
import { AccessibilityLevel, Activity, BoredActivity, PriceCategory } from '../entities/activity.entities';
import Logger from '../../helpers/Logger';

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

    if ((price = 0)) {
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

  async getActivity(req: Request, res: Response) {
    const { key, type, participants, price, minprice, maxprice, accessibility, maxaccesibility, minaccesibility } = req.params;
    const activityRepository = new ActivityRepository();

    let activity = await activityRepository
      .setKey(key)
      .setType(type)
      .setParticipants(participants)
      .setPrice(price)
      .setMinPrice(minprice)
      .setMaxPrice(maxprice)
      .setAccessibility(accessibility)
      .setMaxAccessibility(maxaccesibility)
      .setMinAccessibility(minaccesibility)
      .getActivity();

    res.json(this.mapBoredActivityToActivity(activity));
  }
}

const provider = new ActivityProvider();
const getActivityProvider = (req: Request, res: Response) => {
  return provider.getActivity(req, res);
};

export { getActivityProvider };
