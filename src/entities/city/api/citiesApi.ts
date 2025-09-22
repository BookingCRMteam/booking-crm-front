import { axiosInstance, handleApiError } from '@/shared/api';
import { DYNAMIC_ROUTE } from '@/shared/constants/routes';

export const fetchCities = async (iso2code: string, lang: string = 'uk') => {
  try {
    const { data } = await axiosInstance.get(DYNAMIC_ROUTE.CITIES(iso2code), {
      params: { lang },
    });

    return data;
  } catch (error: unknown) {
    handleApiError(error);
  }
};
