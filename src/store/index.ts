import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { SearchState, createSearchState } from '@/store/searchSlice';

type StoreState = SearchState; // Add more slice types here using '&'

export const useStore = create<StoreState>()(
  devtools(
    (...args) => ({
      ...createSearchState(...args),
      // Add more states from slices here
    }),
    { name: 'CRM Devtools' },
  ),
);
