import { getPluralMinutes } from './getPluralMinutes';

describe('getPluralMinutes', () => {
  test.each([
    [1, 'хвилина'],
    [2, 'хвилини'],
    [3, 'хвилини'],
    [4, 'хвилини'],
    [5, 'хвилин'],
    [10, 'хвилин'],
    [11, 'хвилин'],
    [12, 'хвилин'],
    [13, 'хвилин'],
    [14, 'хвилин'],
    [20, 'хвилин'],
    [21, 'хвилина'],
    [22, 'хвилини'],
    [25, 'хвилин'],
    [51, 'хвилина'],
    [101, 'хвилина'],
    [0, 'хвилин'],
  ])('when count is %i should return "%s"', (count, expected) => {
    expect(getPluralMinutes(count)).toBe(expected);
  });
});
