import { useMutation, useQueryClient } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';

import { User, UserUpdate } from '@/entities/user';
import { userApi } from '@/entities/user';

import { logger } from '@/shared/lib/logger';

import { useUpdateUserIfNeeded } from './useUpdateUserIfNeeded';

jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock('@/entities/user', () => ({
  userApi: { updateUserData: jest.fn() },
}));

jest.mock('@/shared/lib/logger', () => ({
  logger: { info: jest.fn(), error: jest.fn() },
}));

describe('useUpdateUserIfNeeded', () => {
  const mockSetQueryData = jest.fn();

  const mockUser: User = {
    id: 1,
    email: 'existing@example.com',
    sub: 'sub123',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
    operatorId: null,
    firstPersonName: 'Олена',
    firstPersonSurname: 'Петренко',
    secondPersonName: null,
    secondPersonSurname: null,
    phone: '+380501234567',
    role: 'traveler',
  };

  const updateData: UserUpdate = {
    secondPersonName: 'Олег',
    secondPersonSurname: 'Петренко',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useQueryClient as jest.Mock).mockReturnValue({
      setQueryData: mockSetQueryData,
    });

    (useMutation as jest.Mock).mockImplementation(
      ({ onSuccess, onError, mutationFn }) => {
        return {
          mutateAsync: async (data: UserUpdate) => {
            try {
              const result = await mutationFn(data);
              if (onSuccess) onSuccess(result, data, undefined, undefined);
              return result;
            } catch (err) {
              if (onError) onError(err, data, undefined, undefined);
              throw err;
            }
          },
        };
      },
    );
  });

  it('calls mutateAsync only for missing fields', async () => {
    const hook = renderHook(() => useUpdateUserIfNeeded()).result.current;

    const expectedResult = { ...mockUser, ...updateData };
    (userApi.updateUserData as jest.Mock).mockResolvedValue(expectedResult);

    await act(async () => {
      await hook.updateIfMissing(mockUser, updateData);
    });

    expect(mockSetQueryData).toHaveBeenCalledWith(
      ['user', 'me'],
      expectedResult,
    );
    expect(logger.info).toHaveBeenCalledWith('User data updated successfully');
  });

  it('does not call mutateAsync if all fields exist', async () => {
    const hook = renderHook(() => useUpdateUserIfNeeded()).result.current;
    const fullUser: User = { ...mockUser, ...updateData };

    await act(async () => {
      await hook.updateIfMissing(fullUser, updateData);
    });

    expect(mockSetQueryData).not.toHaveBeenCalled();
    expect(logger.info).not.toHaveBeenCalled();
  });

  it('logs error on mutation failure', async () => {
    const hook = renderHook(() => useUpdateUserIfNeeded()).result.current;
    const error = new Error('Failed');
    (userApi.updateUserData as jest.Mock).mockRejectedValue(error);

    await act(async () => {
      await expect(hook.updateIfMissing(mockUser, updateData)).rejects.toThrow(
        error,
      );
    });

    expect(logger.error).toHaveBeenCalledWith(
      'Failed to update user data:',
      error,
    );
    expect(mockSetQueryData).not.toHaveBeenCalled();
  });
});
