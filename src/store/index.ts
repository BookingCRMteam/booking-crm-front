import { SearchSlice, createSearchSlice } from '@/store/searchSlice';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type StoreState = SearchSlice; // Add more slice types here using '&'

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (...args) => ({
        ...createSearchSlice(...args),
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
