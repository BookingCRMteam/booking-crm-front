import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import {
  NotificationState,
  createNotificationState,
} from '@/store/notificationSlice';
import { SearchState, createSearchState } from '@/store/searchSlice';

type StoreState = SearchState & NotificationState; // Add more slice types here using '&'

export const useStore = create<StoreState>()(
  devtools(
    (...args) => ({
      ...createSearchState(...args),
      ...createNotificationState(...args),
      // Add more states from slices here
    }),
    { name: 'CRM Devtools' },
  ),
);
