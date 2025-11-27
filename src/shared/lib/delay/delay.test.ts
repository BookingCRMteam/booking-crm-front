import { delay } from './delay';

describe('delay', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should resolve after the specified time', async () => {
    const ms = 1000;
    const promise = delay(ms);

    jest.advanceTimersByTime(ms);

    await expect(promise).resolves.toBeUndefined();
  });

  it('should resolve immediately if ms is 0', async () => {
    const promise = delay(0);
    await expect(promise).resolves.toBeUndefined();
  });

  it('should resolve immediately if ms is negative', async () => {
    const promise = delay(-100);
    await expect(promise).resolves.toBeUndefined();
  });

  it('should verify that the delay actually waits', async () => {
    const ms = 1000;
    const promise = delay(ms);
    const callback = jest.fn();

    promise.then(callback);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(ms - 1);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);

    await promise;

    expect(callback).toHaveBeenCalled();
  });
});
