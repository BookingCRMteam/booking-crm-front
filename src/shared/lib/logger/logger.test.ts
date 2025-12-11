import log from 'loglevel';

import { logger } from './logger';

jest.mock('loglevel', () => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
  setLevel: jest.fn(),
}));

describe('logger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testCases: { method: keyof typeof logger; prefix: string }[] = [
    { method: 'info', prefix: '[INFO]:' },
    { method: 'warn', prefix: '[WARN]:' },
    { method: 'error', prefix: '[ERROR]:' },
    { method: 'debug', prefix: '[DEBUG]:' },
  ];

  testCases.forEach(({ method, prefix }) => {
    it(`calls log.${method} with prefix and single argument`, () => {
      logger[method]('single message');
      expect(log[method]).toHaveBeenCalledWith(prefix, 'single message');
    });

    it(`forwards multiple arguments unchanged for ${method}()`, () => {
      const args: Parameters<(typeof logger)[typeof method]> = [
        'hello',
        { a: 1 },
        42,
      ];
      logger[method](...args);
      expect(log[method]).toHaveBeenCalledWith(prefix, ...args);
    });
  });
});
