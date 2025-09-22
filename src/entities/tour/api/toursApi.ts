import { axiosInstance, handleApiError } from '@/shared/api';
import { APP_ROUTE, DYNAMIC_ROUTE } from '@/shared/constants/routes';

export const createTour = async (data: FormData) => {
  try {
    await axiosInstance.post(APP_ROUTE.TOURS, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const editTour = async (id: number, data: FormData) => {
  try {
    await axiosInstance.patch(DYNAMIC_ROUTE.TOUR(id), data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
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
