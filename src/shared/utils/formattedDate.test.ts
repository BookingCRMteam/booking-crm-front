import { formattedDate } from './formattedDate';

describe('formattedDate', () => {
  test('should correctly format a valid ISO date string to DD.MM.YY format (uk-UA)', () => {
    const rawDate = '2025-10-15';

    const expectedFormat = '15.10.25';

    expect(formattedDate(rawDate)).toBe(expectedFormat);
  });

  test('should format date correctly when time is included', () => {
    const rawDateWithTime = '2024-01-01T10:30:00.000Z';
    const expectedFormat = '01.01.24';

    expect(formattedDate(rawDateWithTime)).toBe(expectedFormat);
  });

  test('should return the original string if Date object is invalid (NaN)', () => {
    const invalidDateString = 'not-a-valid-date';

    expect(formattedDate(invalidDateString)).toBe(invalidDateString);
  });

  test('should return the original empty string when input is empty', () => {
    const emptyString = '';

    expect(formattedDate(emptyString)).toBe(emptyString);
  });
});
