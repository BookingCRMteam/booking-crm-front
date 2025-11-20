import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import {
  UpdatePhotoMeta,
  createTour,
  deleteTourPhoto,
  editTour,
  updateTourPhotoMeta,
} from '@/entities/tour';

import { transformFormData } from '../lib/transformFormData';
import { TourFormValues } from '../model/schema';

export const useTourFormSubmit = (
  mode: 'create' | 'edit',
  tourId?: number,
  initialValues?: TourFormValues,
  onClose?: () => void,
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleCreateTour = async (formData: FormData) => {
    await createTour(formData);

    queryClient.invalidateQueries({ queryKey: ['tours'] });
    onClose?.();
  };

  const handleUpdatePhotos = async (data: TourFormValues) => {
    if (!tourId || !initialValues) return;

    const updatePromises = data.photos
      .filter((photo) => initialValues.photos.some((p) => p.id === photo.id))
      .map(async (photo) => {
        const initialPhoto = initialValues.photos.find(
          (p) => p.id === photo.id,
        );

        if (!initialPhoto) return;

        const changes: UpdatePhotoMeta = {};

        if (photo.description !== initialPhoto.description) {
          changes.description = photo.description ?? undefined;
        }

        if (photo.isMain && !initialPhoto.isMain) {
          changes.isMain = true;
        }

        if (Object.keys(changes).length) {
          await updateTourPhotoMeta(tourId, photo.id, changes);
        }
      });

    return Promise.all(updatePromises);
  };

  const handleDeletePhotos = async (data: TourFormValues) => {
    if (!tourId || !initialValues) return;

    const deletePromises = initialValues.photos
      .filter((p) => !data.photos.some((np) => np.id === p.id))
      .map((p) => deleteTourPhoto(tourId, p.id));

    return Promise.all(deletePromises);
  };

  const handleEditTour = async (formData: FormData, data: TourFormValues) => {
    if (!tourId) return;
    await editTour(tourId, formData);

    await Promise.all([handleUpdatePhotos(data), handleDeletePhotos(data)]);

    queryClient.invalidateQueries({ queryKey: ['tours'] });
    queryClient.invalidateQueries({ queryKey: ['tour', tourId] });

    onClose?.();
  };

  const handleSubmitForm = async (data: TourFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formData = transformFormData(data, initialValues);

      if (mode === 'create') {
        await handleCreateTour(formData);
      } else if (mode === 'edit') {
        await handleEditTour(formData, data);
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Помилка при збереженні туру, спробуйте, будь ласка, ще раз';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmitForm, isSubmitting, submitError };
};
