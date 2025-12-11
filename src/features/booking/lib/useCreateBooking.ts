import { BookingRequest, createBooking } from '@/entities/booking';

import { ApiError } from '@/shared/api/handleApiError';
import { useBookingStore, useNotificationStore } from '@/shared/store';

import { handleBookingError } from '../utils/handleBookingError';
import { submitLiqpayForm } from '../utils/submitLiqpayForm';

export const useCreateBooking = () => {
  const { closeBookingModal } = useBookingStore();
  const { showNotification } = useNotificationStore();

  const createAndRedirect = async (data: BookingRequest) => {
    try {
      const booking = await createBooking(data);
      submitLiqpayForm(booking.paymentLink);
    } catch (err) {
      const message = handleBookingError(err as ApiError);
      showNotification(message, 'error');
      closeBookingModal();
    }
  };

  return { createAndRedirect };
};
