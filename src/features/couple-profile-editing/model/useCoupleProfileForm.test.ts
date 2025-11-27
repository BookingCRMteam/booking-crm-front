import { useMutation, useQueryClient } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';

import { useUserQuery } from '@/entities/user';

import { useNotificationStore } from '@/shared/store';

import { useCoupleProfileForm } from './useCoupleProfileForm';

jest.mock('@/entities/user', () => ({
  useUserQuery: jest.fn(),
  userApi: {
    updateUserData: jest.fn(),
  },
}));

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
  zodResolver: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock('@/shared/store', () => ({
  useNotificationStore: jest.fn(),
}));

describe('useCoupleProfileForm', () => {
  const mockSetQueryData = jest.fn();
  const mockShowNotification = jest.fn();
  const mockOnCancel = jest.fn();
  const mockMutateAsync = jest.fn();

  const defaultUserData = {
    id: '123',
    email: 'test@mail.com',
    firstPersonName: 'John',
    firstPersonSurname: 'Doe',
    secondPersonName: 'Jane',
    secondPersonSurname: 'Smith',
    phone: '+380931112233',
  };

  const defaultFormData = {
    firstPersonName: 'John',
    firstPersonSurname: 'Doe',
    secondPersonName: 'Jane',
    secondPersonSurname: 'Smith',
    phone: '+380931112233',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useUserQuery as jest.Mock).mockReturnValue({
      data: defaultUserData,
    });

    (useQueryClient as jest.Mock).mockReturnValue({
      setQueryData: mockSetQueryData,
    });

    (useNotificationStore as unknown as jest.Mock).mockReturnValue({
      showNotification: mockShowNotification,
    });

    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });

    (useNotificationStore as unknown as jest.Mock).mockImplementation(
      (selector) => selector({ showNotification: mockShowNotification }),
    );

    (jest.requireMock('react-hook-form').useForm as jest.Mock).mockReturnValue({
      handleSubmit: jest.fn((cb) => cb),
      formState: { isDirty: true, dirtyFields: {} },
      getValues: jest.fn().mockReturnValue(defaultFormData),
      register: jest.fn(),
      control: {},
      setValue: jest.fn(),
    });
  });

  it('initializes form with correct default values', () => {
    const { result } = renderHook(() =>
      useCoupleProfileForm({ onCancel: mockOnCancel }),
    );
    expect(result.current.form.getValues()).toEqual({
      firstPersonName: 'John',
      firstPersonSurname: 'Doe',
      secondPersonName: 'Jane',
      secondPersonSurname: 'Smith',
      phone: '+380931112233',
    });
  });

  it('calls mutateAsync on submit with changed fields', async () => {
    const mockHandleSubmit = jest.fn((cb) => cb);
    const mockForm = {
      handleSubmit: mockHandleSubmit,
      formState: { isDirty: true, dirtyFields: { firstPersonName: true } },
      getValues: jest.fn().mockReturnValue({ firstPersonName: 'newName' }),
    };
    const { useForm } = jest.requireMock('react-hook-form');
    (useForm as jest.Mock).mockReturnValue(mockForm);
    const { result } = renderHook(() =>
      useCoupleProfileForm({ onCancel: mockOnCancel }),
    );
    await act(async () => {
      await result.current.onSubmit({
        firstPersonName: 'newName',
        firstPersonSurname: 'Doe',
        secondPersonName: 'Jane',
        secondPersonSurname: 'Smith',
        phone: '+380931112233',
      });
    });
    expect(mockMutateAsync).toHaveBeenCalledWith({
      firstPersonName: 'newName',
    });
  });

  it('calls onCancel if the form has no changes (isDirty=false)', async () => {
    const mockForm = {
      handleSubmit: jest.fn((cb) => cb),
      formState: { isDirty: false, dirtyFields: {} },
      getValues: jest.fn().mockReturnValue(defaultUserData),
    };
    (jest.requireMock('react-hook-form').useForm as jest.Mock).mockReturnValue(
      mockForm,
    );

    const { result } = renderHook(() =>
      useCoupleProfileForm({ onCancel: mockOnCancel }),
    );

    await act(async () => {
      await result.current.onSubmit(mockForm.getValues());
    });

    expect(mockMutateAsync).not.toHaveBeenCalled();
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
    expect(mockShowNotification).not.toHaveBeenCalled();
  });

  it('calls showNotification on mutation error', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mutationConfig: any;

    (useMutation as jest.Mock).mockImplementation((config) => {
      mutationConfig = config;
      return { mutateAsync: jest.fn(), isPending: false };
    });

    renderHook(() => useCoupleProfileForm({ onCancel: mockOnCancel }));

    const mutationError: Error = {
      message: 'Text error message',
      name: 'mutation error',
    };

    await act(async () => {
      mutationConfig.onError(mutationError);
    });

    expect(mockSetQueryData).not.toHaveBeenCalled();
    expect(mockOnCancel).not.toHaveBeenCalled();
    expect(mockShowNotification).toHaveBeenCalledWith(
      mutationError.message,
      'error',
    );
  });
  it('logs error via console.error on failed mutation in onSubmit', async () => {
    const mockError = new Error('Mutation failed!');
    const mockConsoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const mockForm = {
      handleSubmit: jest.fn((cb) => cb),
      formState: { isDirty: true, dirtyFields: { firstPersonName: true } },
      getValues: jest.fn().mockReturnValue({ firstPersonName: 'fail' }),
    };

    const { useForm } = jest.requireMock('react-hook-form');
    (useForm as jest.Mock).mockReturnValue(mockForm);

    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn().mockRejectedValue(mockError),
      isPending: false,
    });

    const { result } = renderHook(() =>
      useCoupleProfileForm({ onCancel: mockOnCancel }),
    );

    await act(async () => {
      await result.current.onSubmit({
        firstPersonName: 'John',
        firstPersonSurname: 'Doe',
        secondPersonName: 'Jane',
        secondPersonSurname: 'Smith',
        phone: '+380931112233',
      });
    });

    expect(mockConsoleError).toHaveBeenCalledWith(
      'Mutation failed:',
      mockError,
    );
    expect(mockShowNotification).not.toHaveBeenCalled();
    mockConsoleError.mockRestore();
  });
  it('calls showNotification if user is missing', async () => {
    (useUserQuery as jest.Mock).mockReturnValue({ data: null });

    const mockForm = {
      handleSubmit: jest.fn((cb) => cb),
      formState: { isDirty: true, dirtyFields: { firstPersonName: true } },
      getValues: jest.fn().mockReturnValue({ firstPersonName: 'John' }),
    };

    (jest.requireMock('react-hook-form').useForm as jest.Mock).mockReturnValue(
      mockForm,
    );

    const { result } = renderHook(() =>
      useCoupleProfileForm({ onCancel: mockOnCancel }),
    );

    await act(async () => {
      await result.current.onSubmit({
        firstPersonName: 'John',
        firstPersonSurname: 'Doe',
        secondPersonName: 'Jane',
        secondPersonSurname: 'Smith',
        phone: '+380931112233',
      });
    });

    expect(mockShowNotification).toHaveBeenCalledWith(
      'Користувача не знайдено',
      'error',
    );
    expect(mockMutateAsync).not.toHaveBeenCalled();
    expect(mockOnCancel).not.toHaveBeenCalled();
  });
});
