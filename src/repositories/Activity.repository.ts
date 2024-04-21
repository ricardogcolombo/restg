import Logger from '../helpers/Logger';

class ActivityRepository {
  private url: string;

  constructor() {
    this.url = 'http://www.boredapi.com/api/activity?';
  }

  setKey(key: string | undefined) {
    if (!key) return this;
    if (this.url.length === 1) {
      this.url = this.url + `key=${key}`;
    } else {
      this.url = this.url + `&key=${key}`;
    }
    return this;
  }

  setType(type: string | undefined) {
    if (!type) return this;
    if (this.url.length === 1) {
      this.url = this.url + `type=${type}`;
    } else {
      this.url = this.url + `&type=${type}`;
    }

    return this;
  }
  setParticipants(participants: string | undefined) {
    if (!participants) return this;
    if (this.url.length === 1) {
      this.url = this.url + `participants=${participants}`;
    } else {
      this.url = this.url + `&participants=${participants}`;
    }

    return this;
  }
  setPrice(price: string | undefined) {
    if (!price) return this;
    if (this.url.length === 1) {
      this.url = this.url + `price=${price}`;
    } else {
      this.url = this.url + `&price=${price}`;
    }

    return this;
  }
  setMinPrice(minprice: string | undefined) {
    if (!minprice) return this;
    if (this.url.length === 1) {
      this.url = this.url + `minprice=${minprice}`;
    } else {
      this.url = this.url + `&minprice=${minprice}`;
    }

    return this;
  }
  setMaxPrice(maxprice: string | undefined) {
    if (!maxprice) return this;
    if (this.url.length === 1) {
      this.url = this.url + `maxprice=${maxprice}`;
    } else {
      this.url = this.url + `&maxprice=${maxprice}`;
    }
    return this;
  }

  setAccessibility(accessibility: string | undefined) {
    if (!accessibility) return this;
    if (this.url.length === 1) {
      this.url = this.url + `accessibility=${accessibility}`;
    } else {
      this.url = this.url + `&accessibility=${accessibility}`;
    }
    return this;
  }
  setMaxAccessibility(maxaccessibility: string | undefined) {
    if (!maxaccessibility) return this;
    if (this.url.length === 1) {
      this.url = this.url + `maxaccessibility=${maxaccessibility}`;
    } else {
      this.url = this.url + `&maxaccessibility=${maxaccessibility}`;
    }

    return this;
  }
  setMinAccessibility(minaccessibility: string | undefined) {
    if (!minaccessibility) return this;
    if (this.url.length === 1) {
      this.url = this.url + `minaccessibility=${minaccessibility}`;
    } else {
      this.url = this.url + `&minaccessibility=${minaccessibility}`;
    }
    return this;
  }
  getUrl() {
    return this.url;
  }
  reset() {
    this.url = '';
  }
  async getActivity() {
    let activities;
    try {
      Logger.info(`calling ${this.url}`);
      activities = await fetch(this.url).then((activity) => activity.json());
    } catch (error) {
      Logger.error('Failed to fetch from boredapi/activity');
      throw error;
    }

    return activities;
  }
}

export { ActivityRepository };
