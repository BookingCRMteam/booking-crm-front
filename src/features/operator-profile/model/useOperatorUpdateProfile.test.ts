import { renderHook } from '@testing-library/react';

import { operatorApi } from '@/entities/operator';
import { useOperatorQuery } from '@/entities/operator';

import { mockOperator } from '../ui/OperatorProfile/OperatorProfile.test';
import { useOperatorUpdateProfile } from './useOperatorProfile';

const mockNewOperator = {
  ...mockOperator,
  description: 'New description.',
};

jest.mock('@/entities/user', () => ({
  useUserQuery: jest.fn(),
}));

jest.mock('@/entities/operator', () => ({
  ...jest.requireActual('@/entities/operator'),
  useOperatorQuery: jest.fn(),
  operatorApi: {
    setPublicData: jest.fn(),
    deleteMyPhoto: jest.fn(),
  },
}));

const mockShowNotification = jest.fn();
jest.mock('@/shared/store', () => ({
  useNotificationStore: jest.fn((selector) => {
    if (selector.toString().includes('showNotification')) {
      return mockShowNotification;
    }
    return jest.fn();
  }),
}));

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => ({
    handleSubmit: jest.fn(),
    register: jest.fn(),
    control: {},
    formState: { errors: {} },
    getValues: jest.fn(),
    setValue: jest.fn(),
  })),
}));

const mockMutateAsyncSet = jest.fn();
const mockMutateAsyncDeletePhoto = jest.fn();
const mockSetQueryData = jest.fn();

jest.mock('@tanstack/react-query', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useMutation: jest.fn((options: any) => {
    if (options.mutationFn === operatorApi.setPublicData) {
      return {
        mutateAsync: mockMutateAsyncSet,
        isPending: false,
      };
    }
    if (options.mutationFn === operatorApi.deleteMyPhoto) {
      return {
        mutateAsync: mockMutateAsyncDeletePhoto,
        isPending: false,
      };
    }
    return { mutateAsync: jest.fn(), isPending: false };
  }),
  useQueryClient: jest.fn(() => ({
    setQueryData: mockSetQueryData,
  })),
}));

describe('useOperatorUpdateProfile', () => {
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useOperatorQuery as jest.Mock).mockReturnValue({ data: mockOperator });

    mockMutateAsyncSet.mockResolvedValue(mockNewOperator);
    mockMutateAsyncDeletePhoto.mockResolvedValue(mockNewOperator);
  });

  it('calls setPublicData with FormData containing only philosophy changes', async () => {
    const { result } = renderHook(() =>
      useOperatorUpdateProfile({ onCancel: mockOnCancel }),
    );

    const formData = {
      philosophy: 'New philosophy.',
      description: mockOperator.description,
      photo: undefined,
      removePhoto: false,
    };

    await result.current.onSubmit(formData);

    expect(mockMutateAsyncSet).toHaveBeenCalledTimes(1);

    const submittedFormData = mockMutateAsyncSet.mock.calls[0][0];
    expect(submittedFormData instanceof FormData).toBe(true);
    expect(submittedFormData.get('philosophy')).toBe('New philosophy.');
    expect(submittedFormData.get('description')).toBeNull();

    expect(mockSetQueryData).toHaveBeenCalled();
    expect(mockShowNotification).toHaveBeenCalledWith(
      'Профіль оновлено',
      'success',
    );
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('calls setPublicData with FormData containing only description changes', async () => {
    const { result } = renderHook(() =>
      useOperatorUpdateProfile({ onCancel: mockOnCancel }),
    );

    const formData = {
      philosophy: mockOperator.philosophy,
      description: 'New description.',
      photo: undefined,
      removePhoto: false,
    };

    await result.current.onSubmit(formData);

    expect(mockMutateAsyncSet).toHaveBeenCalledTimes(1);

    const submittedFormData = mockMutateAsyncSet.mock.calls[0][0];
    expect(submittedFormData instanceof FormData).toBe(true);
    expect(submittedFormData.get('description')).toBe('New description.');
    expect(submittedFormData.get('philosophy')).toBeNull();

    expect(mockSetQueryData).toHaveBeenCalled();
    expect(mockShowNotification).toHaveBeenCalledWith(
      'Профіль оновлено',
      'success',
    );
    expect(mockOnCancel).toHaveBeenCalled();
  });
  it('calls setPublicData with FormData containing description and philosophy empty', async () => {
    const { result } = renderHook(() =>
      useOperatorUpdateProfile({ onCancel: mockOnCancel }),
    );

    const formData = {
      philosophy: '',
      description: '',
      photo: undefined,
      removePhoto: false,
    };

    await result.current.onSubmit(formData);

    expect(mockMutateAsyncSet).toHaveBeenCalledTimes(1);

    const submittedFormData = mockMutateAsyncSet.mock.calls[0][0];
    expect(submittedFormData instanceof FormData).toBe(true);
    expect(submittedFormData.get('description')).toBe('');
    expect(submittedFormData.get('philosophy')).toBe('');

    expect(mockSetQueryData).toHaveBeenCalled();
    expect(mockShowNotification).toHaveBeenCalledWith(
      'Профіль оновлено',
      'success',
    );
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('calls setPublicData with FormData containing photo file', async () => {
    const { result } = renderHook(() =>
      useOperatorUpdateProfile({ onCancel: mockOnCancel }),
    );

    const mockFile = new File(['test'], 'new_photo.png', { type: 'image/png' });

    const formData = {
      philosophy: mockOperator.philosophy,
      description: mockOperator.description,
      photo: mockFile,
      removePhoto: false,
    };

    await result.current.onSubmit(formData);

    expect(mockMutateAsyncSet).toHaveBeenCalledTimes(1);
    const submittedFormData = mockMutateAsyncSet.mock.calls[0][0];

    expect(submittedFormData.get('photo')).toBe(mockFile);
  });

  it('calls deleteMyPhoto when removePhoto is true and no new photo is uploaded', async () => {
    const { result } = renderHook(() =>
      useOperatorUpdateProfile({ onCancel: mockOnCancel }),
    );

    const formData = {
      philosophy: mockOperator.philosophy,
      description: mockOperator.description,
      photo: undefined,
      removePhoto: true,
    };

    await result.current.onSubmit(formData);

    expect(mockMutateAsyncDeletePhoto).toHaveBeenCalledTimes(1);
    expect(mockMutateAsyncSet).not.toHaveBeenCalled();

    expect(mockSetQueryData).toHaveBeenCalled();
    expect(mockShowNotification).toHaveBeenCalledWith(
      'Профіль оновлено',
      'success',
    );
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('prioritizes new photo upload over removePhoto flag', async () => {
    const { result } = renderHook(() =>
      useOperatorUpdateProfile({ onCancel: mockOnCancel }),
    );

    const mockFile = new File(['test'], 'new_photo.png', { type: 'image/png' });

    const formData = {
      philosophy: mockOperator.philosophy,
      description: mockOperator.description,
      photo: mockFile,
      removePhoto: true,
    };

    await result.current.onSubmit(formData);

    expect(mockMutateAsyncDeletePhoto).not.toHaveBeenCalled();
    expect(mockMutateAsyncSet).toHaveBeenCalledTimes(1);
    const submittedFormData = mockMutateAsyncSet.mock.calls[0][0];
    expect(submittedFormData.get('photo')).toBe(mockFile);
  });

  it('shows info notification and calls onCancel if no changes were made', async () => {
    const { result } = renderHook(() =>
      useOperatorUpdateProfile({ onCancel: mockOnCancel }),
    );

    const formData = {
      philosophy: mockOperator.philosophy,
      description: mockOperator.description,
      photo: undefined,
      removePhoto: false,
    };

    await result.current.onSubmit(formData);

    expect(mockMutateAsyncSet).not.toHaveBeenCalled();
    expect(mockMutateAsyncDeletePhoto).not.toHaveBeenCalled();

    expect(mockShowNotification).toHaveBeenCalledWith(
      'Змін не виявлено',
      'info',
    );
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('handles mutation error and shows error notification', async () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();

    const error = new Error('API Error');
    mockMutateAsyncSet.mockRejectedValue(error);

    const { result } = renderHook(() =>
      useOperatorUpdateProfile({ onCancel: mockOnCancel }),
    );

    const formData = {
      ...mockOperator,
      description: 'New description.',
      photo: undefined,
      removePhoto: false,
    };

    await result.current.onSubmit(formData);

    expect(console.error).toHaveBeenCalledWith(
      'Помилка під час оновлення профілю:',
      error,
    );

    expect(mockShowNotification).toHaveBeenCalledWith('API Error', 'error');

    expect(mockSetQueryData).not.toHaveBeenCalled();
    expect(mockOnCancel).not.toHaveBeenCalled();

    console.error = originalConsoleError;
  });
});
