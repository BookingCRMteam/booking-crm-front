import { TourFormValues } from '../model/schema';

export function transformFormData(
  data: TourFormValues,
  initialData?: TourFormValues,
) {
  const formData = new FormData();

  (
    [
      'title',
      'description',
      'countryISO2Code',
      'cityId',
      'availableSpots',
      'price',
      'currency',
      'startDate',
      'endDate',
    ] as (keyof TourFormValues)[]
  ).forEach((key) => {
    if (!initialData || data[key] !== initialData[key]) {
      formData.set(key, String(data[key]));
    }
  });

  data.photos?.forEach((photo, index) => {
    if (photo.file) {
      formData.append('photo_files', photo.file);
      formData.append(`photos[${index}][isMain]`, String(photo.isMain));
    }
  });

  return formData;
}
