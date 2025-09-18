'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { ModalPropsMap, ModalType } from '@/features/modal/registry/registry';

type AnyPayload = ModalPropsMap[ModalType];

type ModalState = {
  open: boolean;
  type: ModalType | null;
  dismissible: boolean;
  payload?: AnyPayload;

  openModal: <T extends ModalType>(opts: {
    type: T;
    payload?: ModalPropsMap[T];
    dismissible?: boolean;
  }) => void;

  closeModal: () => void;

  setPayload: <T extends ModalType>(payload?: ModalPropsMap[T]) => void;
};

export const useModalStore = create<ModalState>()(
  devtools(
    (set) => ({
      open: false,
      type: null,
      dismissible: true,
      payload: undefined,

      openModal: ({ type, payload, dismissible = true }) =>
        set(
          { open: true, type, payload, dismissible },
          false,
          'modal/openModal',
        ),

      closeModal: () =>
        set(
          {
            open: false,
            type: null,
            payload: undefined,
            dismissible: true,
          },
          false,
          'modal/closeModal',
        ),

      setPayload: (payload) => set({ payload }, false, 'modal/setPayload'),
    }),
    { name: 'modal' },
  ),
);
