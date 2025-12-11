import { useEffect, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { coupleProfileSchema } from '@/features/couple-profile-editing/model/schema';

import { useUserQuery } from '@/entities/user';

import { useBookingStore, useNotificationStore } from '@/shared/store';

import { useCreateBooking } from './useCreateBooking';
import { useUpdateUserIfNeeded } from './useUpdateUserIfNeeded';

const bookingFormSchema = coupleProfileSchema;
type BookingFormSchemaValues = z.infer<typeof bookingFormSchema>;

export const useBookingForm = () => {
  const { data: user } = useUserQuery();
  const { tourData } = useBookingStore();
  const { showNotification } = useNotificationStore();
  const { updateIfMissing } = useUpdateUserIfNeeded();
  const { createAndRedirect } = useCreateBooking();

  const form = useForm<BookingFormSchemaValues>({
    defaultValues: {
      firstPersonName: '',
      firstPersonSurname: '',
      secondPersonName: '',
      secondPersonSurname: '',
      phone: '',
    },
    resolver: zodResolver(bookingFormSchema),
    mode: 'onSubmit',
  });

  const hasInitializedFromUser = useRef(false);

  useEffect(() => {
    if (!user || hasInitializedFromUser.current) return;

    form.reset({
      firstPersonName: user.firstPersonName ?? '',
      firstPersonSurname: user.firstPersonSurname ?? '',
      secondPersonName: user.secondPersonName ?? '',
      secondPersonSurname: user.secondPersonSurname ?? '',
      phone: user.phone ?? '',
    });

    hasInitializedFromUser.current = true;
  }, [user, form]);

  const onSubmit = async (data: BookingFormSchemaValues) => {
    if (!user || !tourData) {
      showNotification('Не вдалося знайти дані користувача або туру', 'error');
      return;
    }

    const {
      firstPersonName,
      firstPersonSurname,
      secondPersonName,
      secondPersonSurname,
      phone,
    } = data;

    await updateIfMissing(user, data);

    await createAndRedirect({
      tourId: tourData.tourId,
      userId: user.id,
      numberOfPeople: 2,
      firstPersonName,
      firstPersonSurname,
      secondPersonName,
      secondPersonSurname,
      phone,
      paymentProvider: 'liqpay',
    });
  };

  return { form, onSubmit };
};
