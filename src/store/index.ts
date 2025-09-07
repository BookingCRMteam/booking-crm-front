import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { SearchState, createSearchState } from '@/store/searchSlice';

import { NotificationState } from './notificationSlice';

type StoreState = SearchState & NotificationState;

export const useStore = create<StoreState>()(
  devtools(
    (...args) => ({
      ...createSearchState(...args),
    }),
    { name: 'CRM Devtools' },
  ),
);
