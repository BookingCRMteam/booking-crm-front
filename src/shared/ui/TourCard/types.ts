import type { TourPhoto } from '@/entities/tour/model/types';

export type TourCardVariantType = 'catalog' | 'booking' | 'operator';

export type TourCardProps = {
  id: number;
  title: string;
  availableSpots: number;
  price: string;
  photos: Pick<TourPhoto, 'isMain' | 'url' | 'description'>[];
  startDate: string;
  endDate: string;
  countryName: string;
  operator: {
    name: string;
    photo: string | null;
    id: number;
  };
  bookingCount?: number;
  bookingId?: number;
  variant?: TourCardVariantType;
};
