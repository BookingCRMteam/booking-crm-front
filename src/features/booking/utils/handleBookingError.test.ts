import { ApiError } from '@/shared/api/handleApiError';

import { handleBookingError } from './handleBookingError';

describe('handleBookingError', () => {
  it('returns unknown error message for non-ApiError object', () => {
    const unknownError = new Error('Some random error');
    const result = handleBookingError(unknownError as unknown as ApiError);
    expect(result).toBe('Сталася невідома помилка');
  });

  it('returns existing booking message for status 409', () => {
    const err = new ApiError('This pair has already booked this tour.', 409);
    const result = handleBookingError(err);
    expect(result).toBe(
      'Місця з такими даними пари вже заброньовані! Але Ви можете забронювати для когось іншого :)',
    );
  });

  it('returns original message for status 409 with different message', () => {
    const err = new ApiError('Some other conflict error', 409);
    const result = handleBookingError(err);
    expect(result).toBe('Some other conflict error');
  });

  it.each([400, 404])(
    'returns no available spots message for status %i',
    (statusCode) => {
      const err = new ApiError('Some error', statusCode);
      const result = handleBookingError(err);
      expect(result).toBe('Нажаль, вільні місця закінчилися');
    },
  );

  it('returns server error message for status 500', () => {
    const err = new ApiError('Server error', 500);
    const result = handleBookingError(err);
    expect(result).toBe('Виникла помилка на сервері. Спробуйте пізніше');
  });

  it('returns custom message for other status codes with message', () => {
    const err = new ApiError('Custom error message', 418);
    const result = handleBookingError(err);
    expect(result).toBe('Custom error message');
  });

  it('returns default message for other status codes without message', () => {
    const err = new ApiError('', 402);
    const result = handleBookingError(err);
    expect(result).toBe('Сталася помилка під час бронювання');
  });
});
