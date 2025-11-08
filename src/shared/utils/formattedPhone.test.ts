import { formattedPhone } from './formattedPhone';

describe('formattedPhone', () => {
  const validNumbers = [
    ['+380501234567', '+380 50 123 45 67'],
    ['380501234567', '+380 50 123 45 67'],
    ['0501234567', '+380 50 123 45 67'],
    ['(050) 123-45-67', '+380 50 123 45 67'],
  ];

  test.each(validNumbers)(
    'formats "%s" correctly → "%s"',
    (input, expected) => {
      expect(formattedPhone(input)).toBe(expected);
    },
  );

  test('returns empty string for falsy input', () => {
    expect(formattedPhone('')).toBe('');
    expect(formattedPhone(null)).toBe('');
    expect(formattedPhone(undefined)).toBe('');
  });

  const invalidLengths = [
    ['123456', '123456'],
    ['12345678900', '12345678900'],
    ['  12345678900  ', '12345678900'],
  ];

  test.each(invalidLengths)(
    'returns original "%s" when length is invalid → "%s"',
    (input, expected) => {
      expect(formattedPhone(input)).toBe(expected);
    },
  );
});
