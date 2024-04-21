import winston from 'winston';

import Logger from '../src/Logger'; // Assuming Logger file is in the same directory

describe('Logger', () => {
  it('should initialize correctly', () => {
    expect(Logger).toBeDefined();
  });

  it('should use correct log level based on environment', () => {
    const env = process.env.NODE_ENV || 'development';
    const expectedLevel = env === 'development' ? 'debug' : 'warn';
    expect(Logger.level).toEqual(expectedLevel);
  });

  it('should use the correct log format', () => {
    const logMessage = 'Test log message';
    const mockInfo = {
      timestamp: '2024-04-21 12:00:00:000',
      level: 'info',
      message: logMessage
    };
    const formattedLog = Logger.format.transform(mockInfo, {});
    expect(formattedLog).toContain(mockInfo.timestamp);
    expect(formattedLog).toContain(mockInfo.level);
    expect(formattedLog).toContain(mockInfo.message);
  });

  it('should have Console and File transports', () => {
    const consoleTransport = Logger.transports.find((transport) => transport instanceof winston.transports.Console);
    const fileTransports = Logger.transports.filter((transport) => transport instanceof winston.transports.File);

    expect(consoleTransport).toBeDefined();
    expect(fileTransports.length).toBe(2);
  });

  it('should have correct levels and colors', () => {
    expect(Logger.levels).toEqual({
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      debug: 4
    });
    expect(Logger.colors).toEqual({
      error: 'red',
      warn: 'yellow',
      info: 'green',
      http: 'magenta',
      debug: 'white'
    });
  });
});
