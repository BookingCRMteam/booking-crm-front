import { operatorOnboardingSchema } from './schema';

describe('operatorOnboardingSchema', () => {
  const validData = {
    firstName: 'Іван',
    lastName: 'Петров-Сидор',
    phone: '+380501234567',
    accept: true,
    website: 'https://example.com',
  };

  it('passes with valid data', () => {
    expect(() => operatorOnboardingSchema.parse(validData)).not.toThrow();
  });

  it('fails when firstName is shorter than 2 characters', () => {
    const result = operatorOnboardingSchema.safeParse({
      ...validData,
      firstName: 'І',
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      'Введіть від 2 до 50 символів',
    );
  });

  it('fails when lastName is shorter than 2 characters', () => {
    const result = operatorOnboardingSchema.safeParse({
      ...validData,
      lastName: 'П',
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      'Введіть від 2 до 50 символів',
    );
  });

  it('fails when firstName is longer than 50 characters', () => {
    const result = operatorOnboardingSchema.safeParse({
      ...validData,
      firstName: 'І'.repeat(51),
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      'Введіть від 2 до 50 символів',
    );
  });

  it('fails when lastName is longer than 50 characters', () => {
    const result = operatorOnboardingSchema.safeParse({
      ...validData,
      lastName: 'П'.repeat(51),
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      'Введіть від 2 до 50 символів',
    );
  });

  it('fails when firstName contains invalid characters', () => {
    const result = operatorOnboardingSchema.safeParse({
      ...validData,
      firstName: 'Iva$n',
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      'Дозволено лише літери, дефіси (-) та апострофи (’).',
    );
  });

  it('fails when lastName has double hyphens', () => {
    const result = operatorOnboardingSchema.safeParse({
      ...validData,
      lastName: 'Петров--Сидор',
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      'Не допускаються подвійні дефіси чи апострофи.',
    );
  });

  it('fails when firstName starts or ends with hyphen', () => {
    const result = operatorOnboardingSchema.safeParse({
      ...validData,
      firstName: '-Іван-',
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      'Дефіс не може бути на початку або в кінці.',
    );
  });

  it('fails when phone is invalid', () => {
    const result = operatorOnboardingSchema.safeParse({
      ...validData,
      phone: '12345',
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      'Введіть коректний номер телефону',
    );
  });

  it('fails when accept is false', () => {
    const result = operatorOnboardingSchema.safeParse({
      ...validData,
      accept: false,
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Необхідно прийняти умови');
  });

  it('fails when website is not URL', () => {
    const result = operatorOnboardingSchema.safeParse({
      ...validData,
      website: 'not a link',
    });

    expect(result.success).toBe(false);
  });

  it('fails when website is too long', () => {
    const result = operatorOnboardingSchema.safeParse({
      ...validData,
      website: `https://example.com/${'a'.repeat(260)}`,
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      'Довжина посилання не може перевищувати 255 символів',
    );
  });
});
