import log from 'loglevel';

if (process.env.NODE_ENV === 'development') {
  log.setLevel('debug');
} else {
  log.setLevel('error');
}

export const logger = {
  info: (...args: unknown[]) => log.info('[INFO]:', ...args),
  warn: (...args: unknown[]) => log.warn('[WARN]:', ...args),
  error: (...args: unknown[]) => log.error('[ERROR]:', ...args),
  debug: (...args: unknown[]) => log.debug('[DEBUG]:', ...args),
};

export default logger;
