import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { SearchState, createSearchState } from '@/store/searchSlice';

type StoreState = SearchState;

export const useStore = create<StoreState>()(
  devtools(
    (...args) => ({
      ...createSearchState(...args),
    }),
    { name: 'CRM Devtools' },
  ),
);
