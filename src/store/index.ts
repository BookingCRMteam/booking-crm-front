import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { SearchState, createSearchState } from '@/store/searchSlice';
import { UserState, createUserState } from '@/store/userSlice';

import {
  NotificationState,
  createNotificationState,
} from './notificationSlice';

type StoreState = SearchState & UserState & NotificationState;

export const useStore = create<StoreState>()(
  devtools(
    (...args) => ({
      ...createSearchState(...args),
      ...createUserState(...args),
      ...createNotificationState(...args),
    }),
    { name: 'CRM Devtools' },
  ),
);
