import { axiosInstance, handleApiError } from '@/shared/api';
import { APP_ROUTE, DYNAMIC_ROUTE } from '@/shared/constants/routes';

import {
  Tour,
  TourDetail,
  TourPhoto,
  Tours,
  UpdatePhotoMeta,
} from '../model/types';

const TOUR_UPLOAD_TIMEOUT = 20000; // 20 seconds for tour upload operations

export const createTour = async (data: FormData): Promise<Tour> => {
  try {
    const { data: res } = await axiosInstance.post<Tour>(
      APP_ROUTE.TOURS,
      data,
      { timeout: TOUR_UPLOAD_TIMEOUT },
    );
    return res;
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const editTour = async (id: number, data: FormData): Promise<Tour> => {
  try {
    const { data: res } = await axiosInstance.patch<Tour>(
      DYNAMIC_ROUTE.TOUR(id),
      data,
      { timeout: TOUR_UPLOAD_TIMEOUT },
    );
    return res;
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const updateTourPhotoMeta = async (
  tourId: number,
  photoId: number,
  data: UpdatePhotoMeta,
): Promise<TourPhoto> => {
  try {
    const { data: res } = await axiosInstance.patch<TourPhoto>(
      DYNAMIC_ROUTE.TOUR_PHOTO(tourId, photoId),
      data,
      { timeout: TOUR_UPLOAD_TIMEOUT },
    );

    return res;
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const deleteTourPhoto = async (
  tourId: number,
  photoId: number,
): Promise<void> => {
  try {
    await axiosInstance.delete(DYNAMIC_ROUTE.TOUR_PHOTO(tourId, photoId));
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const fetchTour = async (id: number): Promise<Tour> => {
  try {
    const response = await axiosInstance.get<TourDetail>(
      DYNAMIC_ROUTE.TOUR(id),
    );

    return response.data.data;
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export interface FetchToursArgs {
  limit?: number;
  offset?: number;
  isFeatured?: boolean;
}

export const fetchTours = async ({
  limit = 6,
  offset = 0,
  isFeatured,
}: FetchToursArgs): Promise<Tours> => {
  try {
    const { data } = await axiosInstance.get<Tours>(APP_ROUTE.TOURS, {
      params: { limit, offset, isFeatured },
    });
    return data;
  } catch (error: unknown) {
    console.log(error);
    return {
      data: [],
      meta: { total: '0', limit, offset },
      message: 'Failed to fetch tours',
    };
  }
};

interface FetchToursByOperatorArgs {
  operatorId: number;
  limit: number;
  offset: number;
}

export const fetchToursByOperator = async ({
  operatorId,
  limit,
  offset,
}: FetchToursByOperatorArgs): Promise<Tours> => {
  try {
    const { data } = await axiosInstance.get<Tours>(APP_ROUTE.TOURS, {
      params: {
        operatorId,
        limit,
        offset,
      },
    });
    return data;
  } catch (error: unknown) {
    console.error('[fetchToursByOperator] Failed:', error);
    handleApiError(error);
  }
};

export const deleteTour = async (tourId: number): Promise<void> => {
  try {
    await axiosInstance.delete(DYNAMIC_ROUTE.TOUR(tourId));
  } catch (error: unknown) {
    handleApiError(error);
  }
};
