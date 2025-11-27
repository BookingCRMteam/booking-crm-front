import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import {
  UpdatePhotoMeta,
  createTour,
  deleteTourPhoto,
  editTour,
  updateTourPhotoMeta,
} from '@/entities/tour';

import { APP_ROUTE } from '@/shared/constants';
import { SUCCESS_FEEDBACK_DELAY_MS } from '@/shared/constants';
import { delay } from '@/shared/lib/delay';

import { transformFormData } from '../lib/transformFormData';
import { TourFormValues } from '../model/schema';

type UseTourFormSubmitProps = {
  operatorId?: number;
  tourId?: number;
  initialValues?: TourFormValues;
};

export const useTourFormSubmit = ({
  operatorId,
  tourId,
  initialValues,
}: UseTourFormSubmitProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const isEditMode = Boolean(tourId);

  const toursQueryKey = operatorId
    ? ['tours', 'operator', operatorId]
    : ['tours'];

  const handleCreateTour = async (formData: FormData) => {
    await createTour(formData);

    queryClient.invalidateQueries({
      queryKey: toursQueryKey,
    });
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

    queryClient.invalidateQueries({ queryKey: toursQueryKey });
    queryClient.invalidateQueries({ queryKey: ['tour', tourId] });
  };

  const handleSubmitForm = async (data: TourFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setIsSuccess(false);

    try {
      const formData = transformFormData(data, initialValues);

      if (!isEditMode) {
        await handleCreateTour(formData);
      } else if (isEditMode) {
        await handleEditTour(formData, data);
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      await delay(SUCCESS_FEEDBACK_DELAY_MS);
      router.push(APP_ROUTE.OPERATOR_TOURS);
    } catch (error: unknown) {
      setIsSubmitting(false);
      setIsSuccess(false);
      const message =
        error instanceof Error
          ? error.message
          : 'Помилка при збереженні туру, спробуйте, будь ласка, ще раз';
      setSubmitError(message);
    }
  };

  return { handleSubmitForm, isSubmitting, submitError, isSuccess };
};
