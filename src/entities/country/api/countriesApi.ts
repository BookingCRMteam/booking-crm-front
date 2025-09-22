import { axiosInstance, handleApiError } from '@/shared/api';
import { APP_ROUTE } from '@/shared/constants/routes';

import { Country } from '../model/types';

export const fetchCountries = async (
  lang: string = 'uk',
): Promise<Country[]> => {
  try {
    const { data } = await axiosInstance.get<Country[]>(APP_ROUTE.COUNTRIES, {
      params: { lang },
    });

    return data;
  } catch (error: unknown) {
    handleApiError(error);
  }
};
