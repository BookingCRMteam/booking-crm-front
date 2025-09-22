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

    if (value === undefined || value === null) return;

    if (!initialData || value !== initialValue) {
      formData.set(key as string, String(value));
    }
  });

  const initialPhotosById = new Map(
    initialData?.photos?.map((p) => [p.id, p]) ?? [],
  );

  data.photos?.forEach((photo, index) => {
    const initialPhoto = initialPhotosById.get(photo.id);

    if (photo.file) {
      // нове фото
      formData.append('photo_files', photo.file);
      formData.append(`photos[${index}][isMain]`, String(photo.isMain));
    } else if (initialPhoto && initialPhoto.isMain !== photo.isMain) {
      // існуюче фото, змінилось тільки isMain
      formData.append(`photos[${index}][id]`, String(photo.id));
      formData.append(`photos[${index}][isMain]`, String(photo.isMain));
    }
  });

  return formData;
}
