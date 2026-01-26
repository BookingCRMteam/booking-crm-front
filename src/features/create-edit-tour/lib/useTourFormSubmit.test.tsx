import { useRouter } from 'next/navigation';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';

import * as tourApi from '@/entities/tour';

import { mockTour, newTourData } from '@/shared/tests';

import { transformFormData } from '../lib/transformFormData';
import { useTourFormSubmit } from './useTourFormSubmit';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/entities/tour', () => ({
  createTour: jest.fn(),
  editTour: jest.fn(),
  updateTourPhotoMeta: jest.fn(),
  deleteTourPhoto: jest.fn(),
}));

jest.mock('../lib/transformFormData', () => ({
  transformFormData: jest.fn((data) => data),
}));

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useTourFormSubmit', () => {
  let pushMock: jest.Mock;

  beforeEach(() => {
    pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    (tourApi.createTour as jest.Mock).mockResolvedValue(mockTour);
    (tourApi.editTour as jest.Mock).mockResolvedValue(mockTour);
    (tourApi.updateTourPhotoMeta as jest.Mock).mockResolvedValue({});
    (tourApi.deleteTourPhoto as jest.Mock).mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call createTour when not in edit mode', async () => {
    const { result } = renderHook(() => useTourFormSubmit({ operatorId: 1 }), {
      wrapper,
    });

    await act(async () => {
      await result.current.handleSubmitForm(newTourData);
    });

    expect(tourApi.createTour).toHaveBeenCalled();
    expect(transformFormData).toHaveBeenCalledWith(newTourData, undefined);
    expect(result.current.isSuccess).toBe(true);
    expect(pushMock).toHaveBeenCalled();
  });

  it('should call editTour when in edit mode', async () => {
    const initialValues = {
      ...newTourData,
      title: 'Old Trip',
      photos: [{ id: 1, isMain: false }],
    };

    const { result } = renderHook(
      () => useTourFormSubmit({ operatorId: 1, tourId: 123, initialValues }),
      { wrapper },
    );

    const data = {
      ...newTourData,
      title: 'New Trip',
      photos: [{ id: 1, isMain: true }],
    };

    await act(async () => {
      await result.current.handleSubmitForm(data);
    });

    expect(tourApi.editTour).toHaveBeenCalled();
    expect(transformFormData).toHaveBeenCalledWith(data, initialValues);
    expect(tourApi.updateTourPhotoMeta).toHaveBeenCalled();
    expect(result.current.isSuccess).toBe(true);
    expect(pushMock).toHaveBeenCalled();
  });

  it('should set submitError when API throws', async () => {
    (tourApi.createTour as jest.Mock).mockRejectedValue(new Error('fail'));

    const { result } = renderHook(() => useTourFormSubmit({ operatorId: 1 }), {
      wrapper,
    });

    await act(async () => {
      await result.current.handleSubmitForm(newTourData);
    });

    expect(result.current.submitError).toBe('fail');
    expect(result.current.isSuccess).toBe(false);
  });

  it('should update photo meta only for changed fields', async () => {
    const initialValues = {
      ...newTourData,
      title: 'Old Trip',
      photos: [
        { id: 1, isMain: false },
        { id: 2, isMain: false },
      ],
    };

    const { result } = renderHook(
      () => useTourFormSubmit({ operatorId: 1, tourId: 123, initialValues }),
      { wrapper },
    );

    const data = {
      ...newTourData,
      title: 'Old Trip',
      photos: [
        { id: 1, isMain: true },
        { id: 2, isMain: false },
      ],
    };

    await act(async () => {
      await result.current.handleSubmitForm(data);
    });

    expect(tourApi.editTour).toHaveBeenCalled();
    expect(tourApi.updateTourPhotoMeta).toHaveBeenCalledTimes(1);
    expect(tourApi.updateTourPhotoMeta).toHaveBeenCalledWith(123, 1, {
      isMain: true,
    });
    expect(tourApi.updateTourPhotoMeta).not.toHaveBeenCalledWith(
      123,
      2,
      expect.anything(),
    );
  });

  it('should delete removed photos', async () => {
    const initialValues = {
      ...newTourData,
      title: 'Trip',
      photos: [
        { id: 1, isMain: false },
        { id: 2, isMain: false },
      ],
    };

    const { result } = renderHook(
      () => useTourFormSubmit({ operatorId: 1, tourId: 123, initialValues }),
      { wrapper },
    );

    const data = {
      ...newTourData,
      title: 'Trip',
      photos: [{ id: 1, isMain: false }],
    };

    await act(async () => {
      await result.current.handleSubmitForm(data);
    });

    expect(tourApi.deleteTourPhoto).toHaveBeenCalledTimes(1);
    expect(tourApi.deleteTourPhoto).toHaveBeenCalledWith(123, 2);
    expect(tourApi.updateTourPhotoMeta).not.toHaveBeenCalled();
  });

  it('should update photo description if changed', async () => {
    const initialValues = {
      ...newTourData,
      photos: [
        { id: 1, isMain: true, description: 'old description' },
        { id: 2, isMain: false, description: 'old desc' },
      ],
    };

    const { result } = renderHook(
      () => useTourFormSubmit({ operatorId: 1, tourId: 123, initialValues }),
      { wrapper },
    );

    const data = {
      ...newTourData,
      photos: [
        { id: 1, isMain: true, description: 'new description' },
        { id: 2, isMain: false, description: 'old desc' },
      ],
    };

    await act(async () => {
      await result.current.handleSubmitForm(data);
    });

    expect(tourApi.updateTourPhotoMeta).toHaveBeenCalledWith(123, 1, {
      description: 'new description',
    });
    expect(tourApi.updateTourPhotoMeta).toHaveBeenCalledTimes(1);
  });

  it('should delete multiple removed photos', async () => {
    const initialValues = {
      ...newTourData,
      photos: [
        { id: 1, isMain: false },
        { id: 2, isMain: false },
        { id: 3, isMain: false },
      ],
    };

    const { result } = renderHook(
      () => useTourFormSubmit({ operatorId: 1, tourId: 123, initialValues }),
      { wrapper },
    );

    const data = {
      ...newTourData,
      photos: [{ id: 1, isMain: false }],
    };

    await act(async () => {
      await result.current.handleSubmitForm(data);
    });

    expect(tourApi.deleteTourPhoto).toHaveBeenCalledTimes(2);
    expect(tourApi.deleteTourPhoto).toHaveBeenCalledWith(123, 2);
    expect(tourApi.deleteTourPhoto).toHaveBeenCalledWith(123, 3);
  });

  it('should set submitError if editTour throws', async () => {
    (tourApi.editTour as jest.Mock).mockRejectedValue(new Error('edit failed'));

    const { result } = renderHook(
      () =>
        useTourFormSubmit({
          operatorId: 1,
          tourId: 123,
          initialValues: newTourData,
        }),
      { wrapper },
    );

    await act(async () => {
      await result.current.handleSubmitForm(newTourData);
    });

    expect(result.current.submitError).toBe('edit failed');
    expect(result.current.isSuccess).toBe(false);
  });

  it('should use correct toursQueryKey with operatorId', async () => {
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useTourFormSubmit({ operatorId: 42 }), {
      wrapper,
    });

    await act(async () => {
      await result.current.handleSubmitForm(newTourData);
    });

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: ['tours', 'operator', 42],
    });
  });

  it('should set default error message if thrown error is not instance of Error', async () => {
    (tourApi.createTour as jest.Mock).mockRejectedValue('some string error');

    const { result } = renderHook(() => useTourFormSubmit({ operatorId: 1 }), {
      wrapper,
    });

    await act(async () => {
      await result.current.handleSubmitForm(newTourData);
    });

    expect(result.current.submitError).toBe(
      'Помилка при збереженні туру, спробуйте, будь ласка, ще раз',
    );
    expect(result.current.isSuccess).toBe(false);
  });

  it('should use default toursQueryKey when operatorId is not provided', async () => {
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useTourFormSubmit({}), { wrapper });

    await act(async () => {
      await result.current.handleSubmitForm(newTourData);
    });

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['tours'] });
  });
});
