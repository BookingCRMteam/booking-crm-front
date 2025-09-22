import { axiosInstance, handleApiError } from '@/shared/api';
import { APP_ROUTE, DYNAMIC_ROUTE } from '@/shared/constants/routes';

import { BackendTour } from '../model/types';

export const createTour = async (data: FormData): Promise<BackendTour> => {
  try {
    const { data: res } = await axiosInstance.post<BackendTour>(
      APP_ROUTE.TOURS,
      data,
    );
    return res;
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const editTour = async (
  id: number,
  data: FormData,
): Promise<BackendTour> => {
  try {
    const { data: res } = await axiosInstance.patch<BackendTour>(
      DYNAMIC_ROUTE.TOUR(id),
      data,
    );
    return res;
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const fetchTour = async (id: number) => {
  try {
    const response = await axiosInstance.get(DYNAMIC_ROUTE.TOUR(id));

    return response.data.data;
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const fetchTours = async () => {
  try {
    const { data } = await axiosInstance.get(APP_ROUTE.TOURS);

    return data;
  } catch (error: unknown) {
    handleApiError(error);
  }
};
