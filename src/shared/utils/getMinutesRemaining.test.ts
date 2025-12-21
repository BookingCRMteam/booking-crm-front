import { getMinutesRemaining } from './getMinutesRemaining';

describe('getMinutesRemaining', () => {
  const mockNow = new Date('2025-12-21T10:00:00Z').getTime();

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(mockNow);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return 60 minutes if expiresAt is 1 hour ahead', () => {
    const expiresAt = '2025-12-21T11:00:00Z';
    expect(getMinutesRemaining(expiresAt)).toBe(60);
  });

  it('should round up seconds using Math.ceil', () => {
    const expiresAt = '2025-12-21T10:01:01Z';
    expect(getMinutesRemaining(expiresAt)).toBe(2);
  });

  it('should return 0 if expiresAt is in the past', () => {
    const expiresAt = '2025-12-21T09:50:00Z';
    expect(getMinutesRemaining(expiresAt)).toBe(0);
  });

  it('should return 0 for invalid date string', () => {
    expect(getMinutesRemaining('invalid-date')).toBe(0);
  });

  it('should return 1 if only 1 second remains', () => {
    const expiresAt = '2025-12-21T10:00:01Z';
    expect(getMinutesRemaining(expiresAt)).toBe(1);
  });
});
