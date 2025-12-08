import { useRouter } from 'next/navigation';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';

import { operatorApi, useOperatorQuery } from '@/entities/operator';

import { useNotificationStore } from '@/shared/store';

import { useOperatorOnboarding } from './useOperatorOnboarding';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/entities/user', () => ({
  useUserQuery: jest.fn(),
}));

jest.mock('@/entities/operator', () => ({
  operatorApi: {
    setNewOperator: jest.fn(),
  },
  useOperatorQuery: jest.fn(),
}));

jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: () => jest.fn(),
}));

jest.mock('@/shared/store', () => ({
  useNotificationStore: jest.fn(),
}));

const mockPush = jest.fn();
const mockShowNotification = jest.fn();

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const qc = new QueryClient();
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
};

describe('useOperatorOnboarding', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useNotificationStore as unknown as jest.Mock).mockReturnValue(
      mockShowNotification,
    );
    (useOperatorQuery as jest.Mock).mockReturnValue({ data: null });
  });

  it('submits successfully and redirects user', async () => {
    (operatorApi.setNewOperator as jest.Mock).mockResolvedValueOnce({});

    const { result } = renderHook(() => useOperatorOnboarding(), { wrapper });

    await act(async () => {
      await result.current.onSubmit({
        firstName: 'John',
        lastName: 'Doe',
        phone: '123',
        website: 'https://a.com',
        accept: true,
      });
    });

    expect(operatorApi.setNewOperator).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      phone: '123',
      website: 'https://a.com',
    });

    expect(mockShowNotification).toHaveBeenCalledWith(
      'Operator created successfully!',
      'success',
    );

    expect(mockPush).toHaveBeenCalledWith('/operator');
  });

  // it('handles API error correctly', async () => {
  //   (operatorApi.setNewOperator as jest.Mock).mockRejectedValueOnce(
  //     new Error('Kaboom'),
  //   );

  //   const mockConsoleError = jest
  //     .spyOn(console, 'error')
  //     .mockImplementation(() => {});

  //   const { result } = renderHook(() => useOperatorOnboarding(), { wrapper });

  //   await act(async () => {
  //     await result.current.onSubmit({
  //       firstName: 'John',
  //       lastName: 'Doe',
  //       phone: '123',
  //       website: 'https://a.com',
  //       accept: true,
  //     });
  //   });

  //   expect(mockShowNotification).toHaveBeenCalledWith('Kaboom', 'error');
  //   expect(mockPush).not.toHaveBeenCalled();
  //   expect(mockConsoleError).toHaveBeenCalled();

  //   mockConsoleError.mockRestore();
  // });
});
