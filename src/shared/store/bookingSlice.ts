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

export const useBookingStore = create<BookingState>((set) => ({
  tourData: null,
  isAuthPopoverOpen: false,
  isOperatorPopoverOpen: false,
  isBookingModalOpen: false,
  isRedirecting: false,

  openAuthPopover: () => set({ isAuthPopoverOpen: true }),
  closeAuthPopover: () => set({ isAuthPopoverOpen: false }),

  openOperatorPopover: () => set({ isOperatorPopoverOpen: true }),
  closeOperatorPopover: () => set({ isOperatorPopoverOpen: false }),

  openBookingModal: (data) =>
    set({
      tourData: data,
      isBookingModalOpen: true,
    }),

  closeBookingModal: () =>
    set({
      tourData: null,
      isBookingModalOpen: false,
    }),

  startRedirect: () => set({ isRedirecting: true }),
  stopRedirect: () => set({ isRedirecting: false }),

  reset: () =>
    set({
      tourData: null,
      isAuthPopoverOpen: false,
      isOperatorPopoverOpen: false,
      isBookingModalOpen: false,
      isRedirecting: false,
    }),
}));
