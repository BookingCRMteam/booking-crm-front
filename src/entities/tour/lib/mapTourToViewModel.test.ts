import { mockTour } from '@/shared/tests';

import { Tour } from '../model/types';
import { mapTourToViewModel } from './mapTourToViewModel';

const MOCKED_DATE_FORMAT = '01.10.2025';

jest.mock('@/shared/utils', () => ({
  formattedDate: jest.fn((dateString) => {
    if (dateString === mockTour.startDate) return '01.01.2026';
    if (dateString === mockTour.endDate) return '07.01.2026';
    return MOCKED_DATE_FORMAT;
  }),
}));

describe('mapTourToViewModel', () => {
  const tour: Tour = mockTour;

  test('should map all fields from Tour to TourViewModel correctly', () => {
    const viewModel = mapTourToViewModel(tour);

    expect(viewModel.id).toBe(tour.id);
    expect(viewModel.title).toBe(tour.title);
    expect(viewModel.description).toBe(tour.description);
    expect(viewModel.photos).toEqual(tour.photos);
    expect(viewModel.availableSpots).toBe(tour.availableSpots);
    expect(viewModel.price).toBe(tour.price);

    expect(viewModel.operatorInfo.id).toBe(tour.operator.id);
    expect(viewModel.operatorInfo.name).toBe('Олена Петренко');
    expect(viewModel.operatorInfo.photo).toBe(tour.operator.photo);

    expect(viewModel.countryAndCity).toBe('Австрія, Зальцбург');

    expect(viewModel.date).toBe('01.01.2026 — 07.01.2026');
  });

  test('should handle null operator photo correctly', () => {
    const viewModel = mapTourToViewModel(tour);

    expect(viewModel.operatorInfo.photo).toBeNull();
  });

  test('should correctly concatenate first and last name', () => {
    const customTour: Tour = {
      ...tour,
      operator: {
        ...tour.operator,
        firstName: 'Іван',
        lastName: 'Коваль',
      },
    };

    const viewModel = mapTourToViewModel(customTour);

    expect(viewModel.operatorInfo.name).toBe('Іван Коваль');
  });

  test('should fallback to "Unknown, Unknown" when no country or city names provided', () => {
    const customTour: Tour = {
      ...tour,
      country: {
        id: 1,
        iso2: '',
        iso3: '',
        translations: [],
      },
      city: {
        id: 1,
        countryIso2: '',
        translations: [],
      },
    };

    const viewModel = mapTourToViewModel(customTour);

    expect(viewModel.countryAndCity).toBe('Unknown, Unknown');
  });
  test('should fallback to "Unknown Operator" when no operator name provided', () => {
    const customTour: Tour = {
      ...tour,
      operator: {
        ...tour.operator,
        firstName: '',
        lastName: '',
      },
    };

    const viewModel = mapTourToViewModel(customTour);

    expect(viewModel.operatorInfo.name).toBe('Unknown Operator');
  });
});
