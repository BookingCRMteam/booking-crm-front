import { newTourData } from '@/shared/tests';

import { TourFormValues } from '../model/schema';
import { transformFormData } from './transformFormData';

describe('transformFormData', () => {
  it('should transform all fields into FormData', () => {
    const formData = transformFormData(newTourData);

    expect(formData.get('title')).toBe('Подорож до Флоренції');
    expect(formData.get('description')).toBe(
      'Незабутня романтична подорож до Флоренції з екскурсіями та гідом',
    );
    expect(formData.get('countryISO2Code')).toBe('FR');
    expect(formData.get('cityId')).toBe('123');
    expect(formData.get('availableSpots')).toBe('10');
    expect(formData.get('price')).toBe('500');
    expect(formData.get('currency')).toBe('UAH');
    expect(formData.get('startDate')).toBe('2026-01-10');
    expect(formData.get('endDate')).toBe('2026-01-20');

    expect(formData.getAll('photo_files').length).toBe(2);
    expect(formData.getAll('photo_files')[0]).toBeInstanceOf(File);
    expect(formData.get('photos[0][isMain]')).toBe('true');
    expect(formData.get('photos[1][isMain]')).toBe('false');
  });

  it('should only include changed fields when initialData is provided', () => {
    const initialData: TourFormValues = {
      ...newTourData,
      title: 'Old title',
      price: '500',
      photos: [],
    };

    const formData = transformFormData(newTourData, initialData);

    expect(formData.get('title')).toBe('Подорож до Флоренції');
    expect(formData.get('price')).toBeNull();
  });

  it('should ignore photos without files', () => {
    const dataWithEmptyPhoto = {
      ...newTourData,
      photos: [{ id: 4, file: undefined, isMain: true }],
    };

    const formData = transformFormData(dataWithEmptyPhoto);

    expect(formData.getAll('photo_files').length).toBe(0);
  });
});
