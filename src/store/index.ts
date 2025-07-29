import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { SearchState, createSearchState } from '@/store/searchSlice';
import { UserState, createUserState } from '@/store/userSlice';

type StoreState = SearchState & UserState;

export const useStore = create<StoreState>()(
  devtools(
    (...args) => ({
      ...createSearchState(...args),
      ...createUserState(...args),
    }),
    { name: 'CRM Devtools' },
  ),
);
