import logger from '../helper/logger';

class ActivityRepository {
  private url: string;

  constructor() {
    this.url = 'http://www.boredapi.com/api/activity?';
  }

  private lastUrlCharIsQueryStringSeparator() {
    return this.url[this.url.length - 1] === '?';
  }

  private setParam(name: string, key: string | number | undefined) {
    if (key === undefined || (typeof key === 'string' && key.length === 0)) return this;
    if (this.lastUrlCharIsQueryStringSeparator()) {
      this.url = this.url + `${name}=${key}`;
    } else {
      this.url = this.url + `&${name}=${key}`;
    }

    return this;
  }

  setKey(key: string | undefined) {
    return this.setParam('key', key);
  }

  setType(type: string | undefined) {
    return this.setParam('type', type);
  }

  setParticipants(participants: number | undefined) {
    return this.setParam('participants', participants);
  }

  setPrice(price: number | undefined) {
    return this.setParam('price', price);
  }

  setMinPrice(minprice: number | undefined) {
    return this.setParam('minprice', minprice);
  }

  setMaxPrice(maxprice: number | undefined) {
    return this.setParam('maxprice', maxprice);
  }

  setAccessibility(accessibility: number | undefined) {
    return this.setParam('accessibility', accessibility);
  }
  setMinAccessibility(minaccessibility: number | undefined) {
    return this.setParam('minaccessibility', minaccessibility);
  }

  setMaxAccessibility(maxaccessibility: number | undefined) {
    return this.setParam('maxaccessibility', maxaccessibility);
  }

  reset() {
    this.url = '';
  }

  getUrl() {
    return this.url;
  }

  async getActivity() {
    let activity;
    try {
      logger.info(`calling ${this.url}`);
      activity = await fetch(this.url).then((response) => response.json());
    } catch (error) {
      logger.error('Failed to fetch from boredapi/activity');
      throw error;
    }

    return activity;
  }
}

export { ActivityRepository };
