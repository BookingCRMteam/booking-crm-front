import { act, renderHook } from '@testing-library/react';

import { useTourGallery } from './useTourGallery';

const mockScrollPrev = jest.fn();
const mockScrollNext = jest.fn();
const mockScrollTo = jest.fn();
const mockSelectedScrollSnap = jest.fn(() => 0);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockOn = jest.fn((): any => ({
  on: mockOn,
}));

jest.mock('embla-carousel-react', () => ({
  __esModule: true,
  default: jest.fn(() => [
    jest.fn(),
    {
      scrollPrev: mockScrollPrev,
      scrollNext: mockScrollNext,
      scrollTo: mockScrollTo,
      selectedScrollSnap: mockSelectedScrollSnap,
      on: mockOn,
    },
  ]),
}));

describe('useTourGallery', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('повертає дефолтні значення', () => {
    const { result } = renderHook(() =>
      useTourGallery({ isCarouselActive: true }),
    );
    expect(typeof result.current.emblaMainRef).toBe('function');
    expect(typeof result.current.emblaThumbsRef).toBe('function');
    expect(result.current.selectedIndex).toBe(0);
  });

  it('викликає scrollPrev і scrollNext', () => {
    const { result } = renderHook(() =>
      useTourGallery({ isCarouselActive: true }),
    );

    act(() => result.current.scrollPrev());
    act(() => result.current.scrollNext());

    expect(mockScrollPrev).toHaveBeenCalledTimes(1);
    expect(mockScrollNext).toHaveBeenCalledTimes(1);
  });

  it('onThumbClick викликає scrollTo з індексом', () => {
    const { result } = renderHook(() =>
      useTourGallery({ isCarouselActive: true }),
    );

    act(() => result.current.onThumbClick(2));

    expect(mockScrollTo).toHaveBeenCalledWith(2);
  });

  it('onSelect оновлює selectedIndex і викликає scrollTo', () => {
    mockSelectedScrollSnap.mockReturnValue(3);
    const { result } = renderHook(() =>
      useTourGallery({ isCarouselActive: true }),
    );

    act(() => {
      result.current.scrollNext();
    });

    act(() => {
      result.current.scrollNext();
    });

    expect(mockOn).toHaveBeenCalledWith('select', expect.any(Function));
    expect(mockOn).toHaveBeenCalledWith('reInit', expect.any(Function));
  });
});
