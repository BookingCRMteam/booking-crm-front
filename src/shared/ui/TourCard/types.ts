import type { TourPhoto } from '@/entities/tour/model/types';

export type TourCardVariantType =
  | 'catalog'
  | 'couple-booking'
  | 'operator-tour';

export type TourCardProps = {
  id: number;
  title: string;
  availableSpots: number;
  price: string;
  photos: TourPhoto[];
  startDate: string;
  endDate: string;
  countryName: string;
  operator: {
    name: string;
    photo: string | null;
    id: number;
  };
  bookingCount?: number;
  variant?: TourCardVariantType;
};
