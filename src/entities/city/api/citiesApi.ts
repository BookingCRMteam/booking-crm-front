import { axiosInstance, handleApiError } from '@/shared/api';
import { DYNAMIC_ROUTE } from '@/shared/constants/routes';

import { City } from '../model/types';

export const fetchCities = async (
  iso2code: string,
  lang: string = 'uk',
): Promise<City[]> => {
  try {
    const { data } = await axiosInstance.get<City[]>(
      DYNAMIC_ROUTE.CITIES(iso2code),
      {
        params: { lang },
      },
    );

    return data;
  } catch (error: unknown) {
    handleApiError(error);
  }
};
