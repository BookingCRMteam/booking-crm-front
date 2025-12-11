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

  it('calls log.info with [INFO]: prefix', () => {
    logger.info('test message');
    expect(log.info).toHaveBeenCalledWith('[INFO]:', 'test message');
  });

  it('calls log.warn with [WARN]: prefix', () => {
    logger.warn('warning');
    expect(log.warn).toHaveBeenCalledWith('[WARN]:', 'warning');
  });

  it('calls log.error with [ERROR]: prefix', () => {
    logger.error('error!');
    expect(log.error).toHaveBeenCalledWith('[ERROR]:', 'error!');
  });

  it('calls log.debug with [DEBUG]: prefix', () => {
    logger.debug('debugging');
    expect(log.debug).toHaveBeenCalledWith('[DEBUG]:', 'debugging');
  });
});
