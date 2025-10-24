import { ApiError } from '@/shared/api/handleApiError';

export const handleBookingError = (err: ApiError): string => {
  if (!(err instanceof ApiError)) return 'Сталася невідома помилка';

  switch (err.statusCode) {
    case 409:
      return 'Бронювання вже існує та очікує на оплату';
    case 400:
    case 404:
      return 'Нажаль, вільні місця закінчилися';
    case 500:
      return 'Виникла помилка на сервері. Спробуйте пізніше';
    default:
      return err.message || 'Сталася помилка під час бронювання';
  }
};
