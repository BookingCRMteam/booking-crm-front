import { create } from 'zustand';

import { TourBookingInfo } from '@/entities/tour/model/types';

type BookingState = {
  tourData: TourBookingInfo | null;
  isAuthPopoverOpen: boolean;
  isOperatorPopoverOpen: boolean;
  isBookingModalOpen: boolean;
  isRedirecting: boolean;
  openAuthPopover: () => void;
  closeAuthPopover: () => void;
  openOperatorPopover: () => void;
  closeOperatorPopover: () => void;
  openBookingModal: (data: TourBookingInfo) => void;
  closeBookingModal: () => void;
  startRedirect: () => void;
  stopRedirect: () => void;
  reset: () => void;
};

const initialState = {
  tourData: null,
  isAuthPopoverOpen: false,
  isOperatorPopoverOpen: false,
  isBookingModalOpen: false,
  isRedirecting: false,
} as const;

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,

  openAuthPopover: () =>
    set((s) =>
      s.isAuthPopoverOpen && !s.isOperatorPopoverOpen
        ? s
        : { isAuthPopoverOpen: true, isOperatorPopoverOpen: false },
    ),
  closeAuthPopover: () =>
    set((s) => (s.isAuthPopoverOpen ? { isAuthPopoverOpen: false } : s)),

  openOperatorPopover: () =>
    set((s) =>
      s.isOperatorPopoverOpen && !s.isAuthPopoverOpen
        ? s
        : { isOperatorPopoverOpen: true, isAuthPopoverOpen: false },
    ),
  closeOperatorPopover: () =>
    set((s) =>
      s.isOperatorPopoverOpen ? { isOperatorPopoverOpen: false } : s,
    ),

  openBookingModal: (data) =>
    set((s) => {
      if (s.tourData === data && s.isBookingModalOpen) return s;

      return {
        tourData: data,
        isBookingModalOpen: true,
        isAuthPopoverOpen: false,
        isOperatorPopoverOpen: false,
      };
    }),

  closeBookingModal: () =>
    set((s) =>
      s.isBookingModalOpen ? { tourData: null, isBookingModalOpen: false } : s,
    ),

  startRedirect: () =>
    set((s) => (s.isRedirecting ? s : { isRedirecting: true })),
  stopRedirect: () =>
    set((s) => (s.isRedirecting ? { isRedirecting: false } : s)),

  reset: () => set(initialState),
}));
