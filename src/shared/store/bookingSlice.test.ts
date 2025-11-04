import { act, renderHook } from '@testing-library/react';

import { TourBookingInfo } from '@/entities/tour/model/types';

import { useBookingStore } from './bookingSlice';

const mockTour1: TourBookingInfo = {
  tourId: 10,
  title: 'Романтична Флоренція',
  price: '78 567',
  countryAndCity: 'Флоренція, Італія',
  date: '01.10.25 — 07.10.25',
};

const mockTour2: TourBookingInfo = {
  tourId: 12,
  title: 'Чарівна Італія',
  price: '80 000',
  countryAndCity: 'Мілан, Італія',
  date: '01.12.25 — 07.12.25',
};

describe('useBookingStore full coverage', () => {
  beforeEach(() => {
    useBookingStore.getState().reset();
  });

  it('opens and closes auth popover correctly', () => {
    const { result } = renderHook(() => useBookingStore());

    act(() => result.current.openAuthPopover());
    expect(result.current.isAuthPopoverOpen).toBe(true);

    act(() => result.current.openAuthPopover());
    expect(result.current.isAuthPopoverOpen).toBe(true);

    act(() => result.current.closeAuthPopover());
    expect(result.current.isAuthPopoverOpen).toBe(false);

    act(() => result.current.closeAuthPopover());
    expect(result.current.isAuthPopoverOpen).toBe(false);
  });

  it('opens booking modal correctly', () => {
    const { result } = renderHook(() => useBookingStore());

    act(() => result.current.openBookingModal(mockTour1));
    expect(result.current.isBookingModalOpen).toBe(true);
    expect(result.current.tourData).toEqual(mockTour1);

    act(() => result.current.openBookingModal(mockTour1));
    expect(result.current.tourData).toEqual(mockTour1);

    act(() => result.current.openBookingModal(mockTour2));
    expect(result.current.tourData).toEqual(mockTour2);
  });

  it('closes booking modal correctly', () => {
    const { result } = renderHook(() => useBookingStore());

    act(() => result.current.openBookingModal(mockTour1));
    act(() => result.current.closeBookingModal());
    expect(result.current.isBookingModalOpen).toBe(false);
    expect(result.current.tourData).toBeNull();

    act(() => result.current.closeBookingModal());
    expect(result.current.isBookingModalOpen).toBe(false);
  });

  it('starts and stops redirect correctly', () => {
    const { result } = renderHook(() => useBookingStore());

    act(() => result.current.startRedirect());
    expect(result.current.isRedirecting).toBe(true);

    act(() => result.current.startRedirect());
    expect(result.current.isRedirecting).toBe(true);

    act(() => result.current.stopRedirect());
    expect(result.current.isRedirecting).toBe(false);

    act(() => result.current.stopRedirect());
    expect(result.current.isRedirecting).toBe(false);
  });

  it('resets the store to initial state', () => {
    const { result } = renderHook(() => useBookingStore());

    act(() => {
      result.current.openBookingModal(mockTour2);
      result.current.openAuthPopover();
      result.current.startRedirect();
    });

    act(() => result.current.reset());

    expect(result.current.tourData).toBeNull();
    expect(result.current.isAuthPopoverOpen).toBe(false);
    expect(result.current.isBookingModalOpen).toBe(false);
    expect(result.current.isRedirecting).toBe(false);
  });
});
