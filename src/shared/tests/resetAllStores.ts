import { useBookingStore } from '../store';

export const resetAllStores = () => {
  useBookingStore.getState().reset();
};
