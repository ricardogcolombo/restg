import { NextFunction, Request, Response } from 'express';
import { ActivityProvider } from '../../../src/domain/providers/activity.provider';
import { ActivityRepository } from '../../../src/repositories/activity.repository';
import { AccessibilityLevel, PriceCategory } from '../../../src/domain/entities/activity.entities';
import logger from '../../../src/helper/logger';
import { BoredActivityFactory } from '../../factories/activity.factory';
import { UsersRepository } from '../../../src/repositories/users.repository';

let mockGetActivity = jest.fn();
jest.mock('../../../src/repositories/activity.repository', () => ({
  ActivityRepository: jest.fn().mockImplementation(() => ({
    setParam: jest.fn().mockReturnThis(),
    lastUrlCharIsQueryStringSeparator: jest.fn().mockImplementation(() => false),
    setKey: jest.fn().mockReturnThis(),
    setType: jest.fn().mockReturnThis(),
    setParticipants: jest.fn().mockReturnThis(),
    setPrice: jest.fn().mockReturnThis(),
    setMinPrice: jest.fn().mockReturnThis(),
    setMaxPrice: jest.fn().mockReturnThis(),
    setAccessibility: jest.fn().mockReturnThis(),
    setMaxAccessibility: jest.fn().mockReturnThis(),
    setMinAccessibility: jest.fn().mockReturnThis(),
    getActivity: mockGetActivity
  }))
}));

let mockSaveProfile = jest.fn();
jest.mock('../../../src/repositories/users.repository', () => ({
  UsersRepository: jest.fn().mockImplementation(() => ({
    saveProfile: mockSaveProfile
  }))
}));
jest.mock('../../../src/helper/logger', () => ({
  info: jest.fn(),
  error: jest.fn()
}));

describe('ActivityProvider', () => {
  let activityProvider: ActivityProvider;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext = jest.fn();
  let mockActivityRepository: jest.Mocked<ActivityRepository>;
  let mockUserRepository: jest.Mocked<UsersRepository>;

  beforeEach(() => {
    activityProvider = new ActivityProvider();
    mockRequest = { query: {} };
    mockResponse = {
      json: jest.fn(),
      send: jest.fn()
    };
    mockActivityRepository = new ActivityRepository() as jest.Mocked<ActivityRepository>;
    mockUserRepository = new UsersRepository() as jest.Mocked<UsersRepository>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getActivity', () => {
    describe('mapBoredPrice', () => {
      it('should respond with FREE PRICE', async () => {
        const boredActivity = BoredActivityFactory.build({ accessibility: 0.5, price: 0 });

        const expectedMappedActivity = { ...boredActivity, accessibility: AccessibilityLevel.MEDIUM, price: PriceCategory.FREE };
        mockGetActivity.mockResolvedValue(boredActivity);

        mockRequest.query = { accessibility: '0.5' };
        await activityProvider.getActivity(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

        expect(mockResponse.json).toHaveBeenCalledWith(expectedMappedActivity);
        expect(logger.info).toHaveBeenCalled();
        expect(logger.error).not.toHaveBeenCalled();
      });

      it('should respond with LOW PRICE', async () => {
        const boredActivity = BoredActivityFactory.build({ accessibility: 0.5, price: 0.5 });

        const expectedMappedActivity = { ...boredActivity, accessibility: AccessibilityLevel.MEDIUM, price: PriceCategory.LOW };
        mockGetActivity.mockResolvedValue(boredActivity);

        mockRequest.query = { accessibility: '0.5' };
        await activityProvider.getActivity(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

        expect(mockResponse.json).toHaveBeenCalledWith(expectedMappedActivity);
        expect(logger.info).toHaveBeenCalled();
        expect(logger.error).not.toHaveBeenCalled();
      });

      it('should respond with LOW PRICE', async () => {
        const boredActivity = BoredActivityFactory.build({ accessibility: 0.5, price: 0.5 - Number.EPSILON });

        const expectedMappedActivity = { ...boredActivity, accessibility: AccessibilityLevel.MEDIUM, price: PriceCategory.LOW };
        mockGetActivity.mockResolvedValue(boredActivity);

        mockRequest.query = { accessibility: '0.5' };
        await activityProvider.getActivity(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

        expect(mockResponse.json).toHaveBeenCalledWith(expectedMappedActivity);
        expect(logger.info).toHaveBeenCalled();
        expect(logger.error).not.toHaveBeenCalled();
      });

      it('should respond with HIGH PRICE', async () => {
        const boredActivity = BoredActivityFactory.build({ accessibility: 0.5, price: 0.5 + Number.EPSILON });

        const expectedMappedActivity = { ...boredActivity, accessibility: AccessibilityLevel.MEDIUM, price: PriceCategory.HIGH };
        mockGetActivity.mockResolvedValue(boredActivity);

        mockRequest.query = { accessibility: '0.5' };
        await activityProvider.getActivity(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

        expect(mockResponse.json).toHaveBeenCalledWith(expectedMappedActivity);
        expect(logger.info).toHaveBeenCalled();
        expect(logger.error).not.toHaveBeenCalled();
      });
    });

    describe('mapBoredAccessibility', () => {
      it('should respond with HIGH Accessibility', async () => {
        const boredActivity = BoredActivityFactory.build({ price: 0, accessibility: 0.25 });

        const expectedMappedActivity = { ...boredActivity, accessibility: AccessibilityLevel.HIGH, price: PriceCategory.FREE };
        mockGetActivity.mockResolvedValue(boredActivity);

        mockRequest.query = { accessibility: '0.5' };
        await activityProvider.getActivity(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

        expect(mockResponse.json).toHaveBeenCalledWith(expectedMappedActivity);
        expect(logger.info).toHaveBeenCalled();
        expect(logger.error).not.toHaveBeenCalled();
      });

      it('should respond with MEDIUM Accessibility', async () => {
        const boredActivity = BoredActivityFactory.build({ price: 0, accessibility: 0.25 + Number.EPSILON });

        const expectedMappedActivity = { ...boredActivity, accessibility: AccessibilityLevel.MEDIUM, price: PriceCategory.FREE };
        mockGetActivity.mockResolvedValue(boredActivity);

        mockRequest.query = { accessibility: '0.5' };
        await activityProvider.getActivity(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

        expect(mockResponse.json).toHaveBeenCalledWith(expectedMappedActivity);
        expect(logger.info).toHaveBeenCalled();
        expect(logger.error).not.toHaveBeenCalled();
      });

      it('should respond with MEDIUM Accessibility when is 0.75', async () => {
        const boredActivity = BoredActivityFactory.build({ accessibility: 0.75, price: 0 });

        const expectedMappedActivity = { ...boredActivity, accessibility: AccessibilityLevel.MEDIUM, price: PriceCategory.FREE };
        mockGetActivity.mockResolvedValue(boredActivity);

        mockRequest.query = { accessibility: '0.5' };
        await activityProvider.getActivity(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

        expect(mockResponse.json).toHaveBeenCalledWith(expectedMappedActivity);
        expect(logger.info).toHaveBeenCalled();
        expect(logger.error).not.toHaveBeenCalled();
      });

      it('should respond with LOW Accessibility when is over 0.75', async () => {
        const boredActivity = BoredActivityFactory.build({ accessibility: 0.75 + Number.EPSILON, price: 0 });

        const expectedMappedActivity = { ...boredActivity, accessibility: AccessibilityLevel.LOW, price: PriceCategory.FREE };
        mockGetActivity.mockResolvedValue(boredActivity);

        mockRequest.query = { accessibility: '0.5' };
        await activityProvider.getActivity(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

        expect(mockResponse.json).toHaveBeenCalledWith(expectedMappedActivity);
        expect(logger.info).toHaveBeenCalled();
        expect(logger.error).not.toHaveBeenCalled();
      });
    });

    it('should handle validation error and respond with error message for invalid price', async () => {
      mockRequest.query = { key: 'key', type: 'type', participants: '2', price: 'price' }; // Invalid price
      const expectedErrorMessage = { error: 'Failed to query due to error in arguments' };

      await activityProvider.getActivity(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

      expect(mockResponse.json).toHaveBeenCalledWith(expectedErrorMessage);
      expect(logger.error).toHaveBeenCalled();
      expect(logger.info).toHaveBeenCalledTimes(2);
    });

    it('should handle error from ActivityRepository and respond with error message', async () => {
      const mockError = new Error('Error fetching activity');
      mockActivityRepository.getActivity.mockRejectedValue(mockError);
      const expectedErrorMessage = { error: 'Failed to query due to error in arguments' };

      await activityProvider.getActivity(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

      expect(mockResponse.json).toHaveBeenCalledWith(expectedErrorMessage);
      expect(logger.error).toHaveBeenCalled();
      expect(logger.info).toHaveBeenCalledTimes(2);
    });
  });

  describe('postUserActivity', () => {
    it('should save user profile and respond with the saved user', async () => {
      const mockUser = { name: 'TestUser', accessibility: 0.5, price: 0.3 };
      const mockSavedUser = { ...mockUser, id: '123' };
      const mockReqBody = { name: mockUser.name, accessibility: mockUser.accessibility, price: mockUser.price };

      mockRequest.body = mockReqBody;
      mockSaveProfile.mockResolvedValue(mockSavedUser);

      await activityProvider.postUserActivity(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockSaveProfile).toHaveBeenCalledWith(mockReqBody);
      expect(mockResponse.json).toHaveBeenCalledWith(mockSavedUser);
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
