import { StateCreator } from 'zustand';

export type SearchState = {
  destination: string;
  origin: string;
  fromDate: string;
  toDate: string;
  travelers: number;
  setFilters: (filters: Partial<SearchState>) => void;
};

export const createSearchState: StateCreator<
  SearchState,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  SearchState
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
