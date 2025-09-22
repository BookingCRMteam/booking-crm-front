import { TourFormValues } from '../model/schema';

export function transformFormData(
  data: TourFormValues,
  initialData?: TourFormValues,
) {
  const formData = new FormData();

  (Object.keys(data) as (keyof TourFormValues)[]).forEach((key) => {
    if (key === 'photos') return;

    const value = data[key];
    const initialValue = initialData ? initialData[key] : undefined;

    if (!initialData || value !== initialValue) {
      formData.append(key, String(value));
    }
  });

  data.photos?.forEach((photo, index) => {
    const initialPhoto = initialData?.photos?.[index];

    if (photo.file) {
      // нове фото
      formData.append('photo_files', photo.file);
      formData.append(`photos[${index}][isMain]`, String(photo.isMain));
    } else if (initialPhoto && initialPhoto.isMain !== photo.isMain) {
      // існуюче фото, змінилось тільки isMain, але бек не приймає id
      formData.append(`photos[${index}][id]`, String(photo.id));
      formData.append(`photos[${index}][isMain]`, String(photo.isMain));
    }
    // існуючі фото без змін нічого не додають, бек не приймає пусте поле
  });

  return formData;
}
