import { StateCreator } from 'zustand';

export type SearchSlice = {
  destination: string;
  origin: string;
  fromDate: string;
  toDate: string;
  travelers: number;
  setFilters: (filters: Partial<SearchSlice>) => void;
};

export const createSearchSlice: StateCreator<
  SearchSlice,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  SearchSlice
> = (set) => ({
  destination: '',
  origin: '',
  fromDate: '',
  toDate: '',
  travelers: 1,

  setFilters: (filters) =>
    set(
      (state) => ({
        ...state,
        ...filters,
      }),
      false,
      'search/setFilters',
    ),
});
