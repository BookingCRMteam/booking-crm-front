import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { SearchState, createSearchState } from '@/store/searchSlice';

type StoreState = SearchState; // Add more slice types here using '&'

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (...args) => ({
        ...createSearchState(...args),
        // Add more slices here
      }),
      {
        name: 'booking-crm-store',
        partialize: () => ({
          /* optionally filter what's persisted */
        }),
      },
    ),
    { name: 'CRM Devtools' },
  ),
);
