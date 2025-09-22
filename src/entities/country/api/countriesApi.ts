import { axiosInstance, handleApiError } from '@/shared/api';
import { APP_ROUTE } from '@/shared/constants/routes';

export const fetchCountries = async (lang: string = 'uk') => {
  try {
    const { data } = await axiosInstance.get(APP_ROUTE.COUNTRIES, {
      params: { lang },
    });

    return data;
  } catch (error: unknown) {
    handleApiError(error);
  }
};
