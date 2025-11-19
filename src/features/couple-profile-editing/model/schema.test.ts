import { coupleProfileSchema, stringWithValidNameChars } from './schema';

jest.mock('mui-tel-input', () => ({
  matchIsValidTel: jest.fn((value) => {
    return value.startsWith('+380') && value.length > 10;
  }),
}));

const validData = {
  firstPersonName: 'Іван',
  firstPersonSurname: 'Коваленко-Сміт',
  secondPersonName: 'Марія',
  secondPersonSurname: 'Д’яченко',
  phone: '+380991234567',
  email: 'test@example.com',
};

describe('stringWithValidNameChars', () => {
  it('validates correct names with letters, spaces and hyphens', () => {
    expect(stringWithValidNameChars.safeParse('Іван-Петро').success).toBe(true);
    expect(stringWithValidNameChars.safeParse('Марія Д’яченко').success).toBe(
      true,
    );
    expect(stringWithValidNameChars.safeParse('Лео').success).toBe(true);
  });

  it('rejects strings shorter than 2 characters', () => {
    const result = stringWithValidNameChars.safeParse('А');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Введіть від 2 до 50 символів.',
      );
    }
  });

  it('rejects strings containing digits or special characters', () => {
    expect(stringWithValidNameChars.safeParse('Іван1').success).toBe(false);
    expect(stringWithValidNameChars.safeParse('Іван@').success).toBe(false);
  });

  it('rejects double hyphens, double apostrophes, and double spaces', () => {
    expect(stringWithValidNameChars.safeParse('Іван--Петро').success).toBe(
      false,
    );
    expect(stringWithValidNameChars.safeParse('Марія  Іванівна').success).toBe(
      false,
    );
    expect(stringWithValidNameChars.safeParse('Д’’яченко').success).toBe(false);
  });

  it('rejects names with leading or trailing spaces or hyphens', () => {
    expect(stringWithValidNameChars.safeParse('-Іван').success).toBe(false);
    expect(stringWithValidNameChars.safeParse('Іван-').success).toBe(false);
    expect(stringWithValidNameChars.safeParse(' Іван').success).toBe(false);
    expect(stringWithValidNameChars.safeParse('Іван ').success).toBe(false);
  });
});

describe('coupleProfileSchema', () => {
  it('validates a correct complete object', () => {
    const result = coupleProfileSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects invalid phone number', () => {
    const invalidPhoneData = { ...validData, phone: '123' };
    const result = coupleProfileSchema.safeParse(invalidPhoneData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'phone')).toBe(true);
      expect(
        result.error.issues.find((i) => i.path[0] === 'phone')?.message,
      ).toBe('Введіть коректний номер телефону');
    }
  });

  it('rejects object if firstPersonName is invalid', () => {
    const invalidData = { ...validData, firstPersonName: ' Іван ' };
    const result = coupleProfileSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path[0] === 'firstPersonName'),
      ).toBe(true);
    }
  });

  it('collects all validation errors in the object', () => {
    const multipleErrorsData = {
      ...validData,
      firstPersonName: ' А ',
      phone: '123',
    };
    const result = coupleProfileSchema.safeParse(multipleErrorsData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThanOrEqual(2);
      expect(
        result.error.issues.some((i) => i.path[0] === 'firstPersonName'),
      ).toBe(true);
      expect(result.error.issues.some((i) => i.path[0] === 'phone')).toBe(true);
    }
  });
});
