import { useQuery } from '@tanstack/react-query';

import { fetchCountries } from '../api/countriesApi';
import { Country } from './types';

export const useCountries = (lang: string = 'uk') => {
  return useQuery<Country[], Error>({
    queryKey: ['countries', lang],
    queryFn: () => fetchCountries(lang),
    staleTime: Infinity,
  });
};
