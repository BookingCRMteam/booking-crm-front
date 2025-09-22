import { useQuery } from '@tanstack/react-query';

import { fetchCities } from '../api/citiesApi';
import { City } from './types';

export const useCities = (iso2code: string, lang: string = 'uk') => {
  return useQuery<City[], Error>({
    queryKey: ['cities', iso2code, lang],
    queryFn: () => fetchCities(iso2code, lang),
    staleTime: Infinity,
    enabled: !!iso2code,
  });
};
