import { act, renderHook } from '@testing-library/react';

import { useUserQuery } from '@/entities/user';

import { useBookingStore, useNotificationStore } from '@/shared/store';

import { useBookingForm } from './useBookingForm';
import { useCreateBooking } from './useCreateBooking';
import { useUpdateUserIfNeeded } from './useUpdateUserIfNeeded';

jest.mock('react-hook-form', () => ({
  useForm: jest.fn().mockReturnValue({
    handleSubmit: jest.fn(),
    register: jest.fn(),
    setValue: jest.fn(),
    getValues: jest.fn(),
    reset: jest.fn(),
  }),
}));

jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: jest.fn(),
}));

jest.mock('@/entities/user', () => ({
  useUserQuery: jest.fn(),
}));

jest.mock('@/shared/store', () => ({
  useBookingStore: jest.fn(),
  useNotificationStore: jest.fn(),
}));

jest.mock('./useUpdateUserIfNeeded', () => ({
  useUpdateUserIfNeeded: jest.fn(),
}));

jest.mock('./useCreateBooking', () => ({
  useCreateBooking: jest.fn(),
}));

describe('useBookingForm', () => {
  const mockShowNotification = jest.fn();
  const mockUpdateIfMissing = jest.fn();
  const mockCreateAndRedirect = jest.fn();
  const mockTourData = { tourId: 42 };
  const mockUser = { id: 1, firstPersonName: 'John' };

  beforeEach(() => {
    jest.clearAllMocks();

    (useUserQuery as jest.Mock).mockReturnValue({ data: mockUser });
    (useBookingStore as unknown as jest.Mock).mockReturnValue({
      tourData: mockTourData,
    });
    (useNotificationStore as unknown as jest.Mock).mockReturnValue({
      showNotification: mockShowNotification,
    });
    (useUpdateUserIfNeeded as jest.Mock).mockReturnValue({
      updateIfMissing: mockUpdateIfMissing,
    });
    (useCreateBooking as jest.Mock).mockReturnValue({
      createAndRedirect: mockCreateAndRedirect,
    });
  });

  it('initializes form with user data', () => {
    const { result } = renderHook(() => useBookingForm());

    expect(result.current.form).toBeDefined();
    expect(useUserQuery).toHaveBeenCalled();
    expect(useBookingStore).toHaveBeenCalled();
  });

  it('shows error if no user or tourData', async () => {
    (useUserQuery as jest.Mock).mockReturnValue({ data: null });
    (useBookingStore as unknown as jest.Mock).mockReturnValue({
      tourData: null,
    });

    const { result } = renderHook(() => useBookingForm());

    await act(async () => {
      await result.current.onSubmit({
        firstPersonName: 'Jane',
        firstPersonSurname: 'Doe',
        secondPersonName: '',
        secondPersonSurname: '',
        phone: '123456',
      });
    });

    expect(mockShowNotification).toHaveBeenCalledWith(
      'Не вдалося знайти дані користувача або туру',
      'error',
    );
    expect(mockUpdateIfMissing).not.toHaveBeenCalled();
    expect(mockCreateAndRedirect).not.toHaveBeenCalled();
  });

  it('calls updateIfMissing and createAndRedirect on success', async () => {
    const { result } = renderHook(() => useBookingForm());

    const formData = {
      firstPersonName: 'Jane',
      firstPersonSurname: 'Doe',
      secondPersonName: 'Mark',
      secondPersonSurname: 'Smith',
      phone: '123456',
    };

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(mockUpdateIfMissing).toHaveBeenCalledWith(mockUser, formData);

    expect(mockCreateAndRedirect).toHaveBeenCalledWith({
      tourId: 42,
      userId: 1,
      numberOfPeople: 2,
      firstPersonName: 'Jane',
      firstPersonSurname: 'Doe',
      secondPersonName: 'Mark',
      secondPersonSurname: 'Smith',
      phone: '123456',
      paymentProvider: 'liqpay',
    });
    expect(mockShowNotification).not.toHaveBeenCalled();
  });
});
