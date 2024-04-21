import { ActivityRepository } from '../../src/repositories/activity.repository';

describe('ActivityUrlParametersBuilder', () => {
  let builder: ActivityRepository;

  beforeEach(() => {
    builder = new ActivityRepository();
  });

  describe('setKey', () => {
    test('should set key in URL', () => {
      const key = 'abc123';
      const url = builder.setKey(key).getUrl();
      expect(url).toContain(`key=${key}`);
    });

    test('should not set key if undefined', () => {
      const url = builder.setKey(undefined).getUrl();

      expect(url).not.toContain('key');
    });

    test('should not set key if empty string', () => {
      const url = builder.setKey('').getUrl();
      expect(url).not.toContain('key');
    });
  });

  describe('setType', () => {
    test('should set type in URL', () => {
      const type = 'sport';
      const url = builder.setType(type).getUrl();
      expect(url).toContain(`type=${type}`);
    });

    test('should not set type if undefined', () => {
      const url = builder.setType(undefined).getUrl();
      expect(url).not.toContain('type');
    });

    test('should not set type if empty string', () => {
      const url = builder.setType('').getUrl();
      expect(url).not.toContain('type');
    });
  });

  describe('setParticipants', () => {
    test('should set participants in URL', () => {
      const participants = '2';
      const url = builder.setParticipants(participants).getUrl();
      expect(url).toContain(`participants=${participants}`);
    });

    test('should not set participants if undefined', () => {
      const url = builder.setParticipants(undefined).getUrl();
      expect(url).not.toContain('participants');
    });

    test('should not set participants if empty string', () => {
      const url = builder.setParticipants('').getUrl();
      expect(url).not.toContain('participants');
    });
  });

  describe('setPrice', () => {
    test('should set price in URL', () => {
      const price = '10';
      const url = builder.setPrice(price).getUrl();
      expect(url).toContain(`price=${price}`);
    });

    test('should not set price if undefined', () => {
      const url = builder.setPrice(undefined).getUrl();
      expect(url).not.toContain('price');
    });

    test('should not set price if empty string', () => {
      const url = builder.setPrice('').getUrl();
      expect(url).not.toContain('price');
    });
  });

  describe('setMinPrice', () => {
    test('should set min price in URL', () => {
      const minprice = '5';
      const url = builder.setMinPrice(minprice).getUrl();
      expect(url).toContain(`minprice=${minprice}`);
    });

    test('should not set min price if undefined', () => {
      const url = builder.setMinPrice(undefined).getUrl();
      expect(url).not.toContain('minprice');
    });

    test('should not set min price if empty string', () => {
      const url = builder.setMinPrice('').getUrl();
      expect(url).not.toContain('minprice');
    });
  });

  describe('setMaxPrice', () => {
    test('should set max price in URL', () => {
      const maxprice = '20';
      const url = builder.setMaxPrice(maxprice).getUrl();
      expect(url).toContain(`maxprice=${maxprice}`);
    });

    test('should not set max price if undefined', () => {
      const url = builder.setMaxPrice(undefined).getUrl();
      expect(url).not.toContain('maxprice');
    });

    test('should not set max price if empty string', () => {
      const url = builder.setMaxPrice('').getUrl();
      expect(url).not.toContain('maxprice');
    });
  });

  describe('setAccessibility', () => {
    test('should set accessibility in URL', () => {
      const accessibility = 'easy';
      const url = builder.setAccessibility(accessibility).getUrl();
      expect(url).toContain(`accessibility=${accessibility}`);
    });

    test('should not set accessibility if undefined', () => {
      const url = builder.setAccessibility(undefined).getUrl();
      expect(url).not.toContain('accessibility');
    });

    test('should not set accessibility if empty string', () => {
      const url = builder.setAccessibility('').getUrl();
      expect(url).not.toContain('accessibility');
    });
  });

  describe('setMaxAccessibility', () => {
    test('should set max accessibility in URL', () => {
      const maxaccessibility = 'high';
      const url = builder.setMaxAccessibility(maxaccessibility).getUrl();
      expect(url).toContain(`maxaccessibility=${maxaccessibility}`);
    });

    test('should not set max accessibility if undefined', () => {
      const url = builder.setMaxAccessibility(undefined).getUrl();
      expect(url).not.toContain('maxaccessibility');
    });

    test('should not set max accessibility if empty string', () => {
      const url = builder.setMaxAccessibility('').getUrl();
      expect(url).not.toContain('maxaccessibility');
    });
  });

  describe('setMinAccessibility', () => {
    test('should set min accessibility in URL', () => {
      const minaccessibility = 'medium';
      const url = builder.setMinAccessibility(minaccessibility).getUrl();
      expect(url).toContain(`minaccessibility=${minaccessibility}`);
    });

    test('should not set min accessibility if undefined', () => {
      const url = builder.setMinAccessibility(undefined).getUrl();
      expect(url).not.toContain('minaccessibility');
    });

    test('should not set min accessibility if empty string', () => {
      const url = builder.setMinAccessibility('').getUrl();
      expect(url).not.toContain('minaccessibility');
    });
  });
  it('should build a valid URL with multiple parameters', () => {
    const builder = new ActivityRepository();

    const url = builder
      .setKey('exampleKey')
      .setType('education')
      .setParticipants('1')
      .setPrice('0')
      .setMinPrice('0')
      .setMaxPrice('1')
      .setAccessibility('0.1')
      .setMaxAccessibility('0.5')
      .setMinAccessibility('0')
      .getUrl();

    expect(url).toBe(
      'http://www.boredapi.com/api/activity?key=exampleKey&type=education&participants=1&price=0&minprice=0&maxprice=1&accessibility=0.1&maxaccessibility=0.5&minaccessibility=0'
    );
  });
});
