import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';

import { BoredActivity } from '../../src/domain/entities/activity.entities';

export const BoredActivityFactory = Factory.Sync.makeFactory<BoredActivity>({
  activity: faker.string.sample(),
  accessibility: faker.number.float({ min: 0.0, max: 1.0 }),
  type: faker.string.sample(10),
  participants: faker.number.int({ min: 1, max: 100 }),
  price: faker.number.float({ min: 0.0, max: 1.0 }),
  link: faker.internet.url(),
  key: faker.string.sample()
});
