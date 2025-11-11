import { useMutation, useQueryClient } from '@tanstack/react-query';
import { act } from '@testing-library/react';

import { User, UserUpdate } from '@/entities/user';

import { logger } from '@/shared/lib/logger';

import { useUpdateUserIfNeeded } from './useUpdateUserIfNeeded';

jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock('@/entities/user', () => ({
  userApi: {
    updateUserData: jest.fn(),
  },
}));

jest.mock('@/shared/lib/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('@auth0/nextjs-auth0', () => ({
  useUser: jest.fn().mockReturnValue({ user: { sub: '123' }, error: null }),
}));

describe('useUpdateUserIfNeeded', () => {
  let mockSetQueryData: jest.Mock;
  let mutationConfig: Parameters<typeof useMutation>[0];
  let mockMutateAsync: jest.Mock;

  const mockUserWithoutData: User = {
    id: 1,
    email: 'existing@example.com',
    sub: 'sub123',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
    operatorId: null,
    firstPersonName: null,
    firstPersonSurname: null,
    secondPersonName: null,
    secondPersonSurname: null,
    phone: null,
    role: 'traveler',
  };

  const updateData: UserUpdate = {
    firstPersonName: 'John',
    firstPersonSurname: 'Doe',
    email: 'test@mail.com',
  };

  beforeEach(() => {
    mockSetQueryData = jest.fn();
    mockMutateAsync = jest.fn();

    (useQueryClient as jest.Mock).mockReturnValue({
      setQueryData: mockSetQueryData,
    });

    (useMutation as jest.Mock).mockImplementation((config) => {
      mutationConfig = config;
      return { mutateAsync: mockMutateAsync, isPending: false };
    });

    jest.clearAllMocks();
  });

  it('calls mutateAsync only for missing fields', async () => {
    const hook = useUpdateUserIfNeeded();

    mockMutateAsync.mockResolvedValue({
      ...mockUserWithoutData,
      ...updateData,
    });

    await act(async () => {
      await hook.updateIfMissing(mockUserWithoutData, updateData);
    });

    expect(mockMutateAsync).toHaveBeenCalledWith({
      firstPersonName: 'John',
      firstPersonSurname: 'Doe',
    });
  });

  it('does not call mutateAsync if all fields exist', async () => {
    const hook = useUpdateUserIfNeeded();

    const fullUser: User = {
      ...mockUserWithoutData,
      firstPersonName: 'John',
      firstPersonSurname: 'Doe',
    };

    await act(async () => {
      await hook.updateIfMissing(fullUser, updateData);
    });

    expect(mockMutateAsync).not.toHaveBeenCalled();
  });

  it('calls setQueryData and logger.info on successful mutation', async () => {
    const hook = useUpdateUserIfNeeded();

    const updatedUser: User = {
      ...mockUserWithoutData,
      firstPersonName: 'John',
      firstPersonSurname: 'Doe',
    };

    mockMutateAsync.mockResolvedValue(updatedUser);

    await act(async () => {
      await hook.updateIfMissing(mockUserWithoutData, updateData);

      mutationConfig.onSuccess?.(
        updatedUser,
        { firstPersonName: 'John', firstPersonSurname: 'Doe' },
        undefined,
      );
    });

    expect(mockSetQueryData).toHaveBeenCalledWith(['user', 'me'], updatedUser);
    expect(logger.info).toHaveBeenCalledWith('User data updated successfully');
  });

  it('logs error on mutation failure', async () => {
    const hook = useUpdateUserIfNeeded();

    const error = new Error('Failed');
    mockMutateAsync.mockRejectedValue(error);

    await act(async () => {
      try {
        await hook.updateIfMissing(mockUserWithoutData, updateData);
      } catch {}

      mutationConfig.onError?.(
        error,
        { firstPersonName: 'John', firstPersonSurname: 'Doe' },
        undefined,
      );
    });

    expect(logger.error).toHaveBeenCalledWith(
      'Failed to update user data:',
      error,
    );
    expect(mockSetQueryData).not.toHaveBeenCalled();
  });
});
