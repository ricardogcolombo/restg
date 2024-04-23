import request from 'supertest';
import app from '../../src/server/';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        accessibility: 0,
        activity: 'Find a charity and donate to it',
        key: '1488053',
        link: '',
        participants: 1,
        price: 0,
        type: 'charity'
      })
  })
) as jest.Mock;

describe('Get Activity', () => {
  describe('Get /activity', () => {
    it('should return an activity', async () => {
      const res = await request(app).get('/api/v1/activity');
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject({
        accessibility: 'HIGH',
        activity: 'Find a charity and donate to it',
        key: '1488053',
        link: '',
        participants: 1,
        price: 'FREE',
        type: 'charity'
      });
    });
  });
});
