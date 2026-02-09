import { ApiError } from '@/shared/api/handleApiError';

export const handleBookingError = (err: unknown): string => {
  if (!(err instanceof ApiError)) return 'Сталася невідома помилка';

  switch (err.statusCode) {
    case 409:
      if (err.message === 'This pair has already booked this tour.') {
        return 'Місця з такими даними пари вже заброньовані! Але Ви можете забронювати для когось іншого :)';
      }
      return err.message;
    case 400:
    case 404:
      return 'Нажаль, вільні місця закінчилися';
    case 500:
      return 'Виникла помилка на сервері. Спробуйте пізніше';
    default:
      return err.message || 'Сталася помилка під час бронювання';
  }
};
