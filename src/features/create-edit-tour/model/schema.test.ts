import { newTourData } from '@/shared/tests';

import { TourFormSchema } from './schema';

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2025-01-01'));
});

afterAll(() => {
  jest.useRealTimers();
});

const parse = (override = {}) =>
  TourFormSchema.safeParse({ ...newTourData, ...override });

describe('TourFormSchema – base validation', () => {
  it('passes with valid data', () => {
    const result = parse();
    expect(result.success).toBe(true);
  });
});

describe('title validation', () => {
  it('fails if title is too short', () => {
    const result = parse({ title: 'Hi' });
    expect(result.success).toBe(false);
  });

  it('fails if title contains invalid symbols', () => {
    const result = parse({ title: '----' });
    expect(result.success).toBe(false);
  });
});

describe('description validation', () => {
  it('fails if description is too short', () => {
    const result = parse({ description: 'Too short' });
    expect(result.success).toBe(false);
  });

  it('fails if description is too long', () => {
    const result = parse({ description: 'A'.repeat(6000) });
    expect(result.success).toBe(false);
  });
});

describe('location validation', () => {
  it('fails if country is empty', () => {
    const result = parse({ countryISO2Code: '' });
    expect(result.success).toBe(false);
  });

  it('fails if cityId is not positive', () => {
    const result = parse({ cityId: 0 });
    expect(result.success).toBe(false);
  });
});

describe('availableSpots validation', () => {
  it('fails if spots is odd number', () => {
    const result = parse({ availableSpots: 3 });
    expect(result.success).toBe(false);
  });

  it('fails if spots < 2', () => {
    const result = parse({ availableSpots: 1 });
    expect(result.success).toBe(false);
  });

  it('fails if spots > 100', () => {
    const result = parse({ availableSpots: 102 });
    expect(result.success).toBe(false);
  });
});

describe('price & currency validation', () => {
  it('fails if price is empty', () => {
    const result = parse({ price: '' });
    expect(result.success).toBe(false);
  });

  it('fails if price has more than 2 decimals', () => {
    const result = parse({ price: '12.999' });
    expect(result.success).toBe(false);
  });

  it('fails if UAH price is out of range', () => {
    const result = parse({ price: '50', currency: 'UAH' });
    expect(result.success).toBe(false);
  });

  it('fails if USD price is out of range', () => {
    const result = parse({ price: '1', currency: 'USD' });
    expect(result.success).toBe(false);
  });

  it('passes for valid EUR price', () => {
    const result = parse({ price: '100', currency: 'EUR' });
    expect(result.success).toBe(true);
  });
});

describe('date validation', () => {
  it('fails if startDate is in the past', () => {
    const result = parse({ startDate: '2000-01-01' });
    expect(result.success).toBe(false);
  });

  it('fails if endDate is before startDate', () => {
    const result = parse({
      startDate: '2099-01-10',
      endDate: '2099-01-05',
    });
    expect(result.success).toBe(false);
  });

  it('passes if endDate equals startDate', () => {
    const result = parse({
      startDate: '2099-01-10',
      endDate: '2099-01-10',
    });
    expect(result.success).toBe(true);
  });
});

describe('photos validation', () => {
  it('fails if no photos provided', () => {
    const result = parse({ photos: [] });
    expect(result.success).toBe(false);
  });

  it('fails if photo has no file and no url', () => {
    const result = parse({
      photos: [
        {
          id: 1,
          isMain: true,
          file: null,
          url: null,
        },
      ],
    });
    expect(result.success).toBe(false);
  });

  it('fails if more than 10 photos', () => {
    const photos = Array.from({ length: 11 }).map((_, i) => ({
      id: i,
      isMain: i === 0,
      url: 'https://example.com/photo.jpg',
      file: null,
    }));

    const result = parse({ photos });
    expect(result.success).toBe(false);
  });
});
