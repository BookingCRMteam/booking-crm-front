import { getTranslation } from '@/shared/lib/translation';
import { formattedDate } from '@/shared/utils';

import { Tour, TourPhoto } from '../model/types';

export type TourViewModel = {
  id: number;
  title: string;
  description: string;
  photos: TourPhoto[];
  availableSpots: number;
  price: string;
  operatorInfo: {
    id: number;
    name: string;
    photo: string | null;
  };
  countryAndCity: string;
  date: string;
};

export const mapTourToViewModel = (tour: Tour): TourViewModel => ({
  id: tour.id,
  title: tour.title,
  description: tour.description,
  photos: tour.photos,
  availableSpots: tour.availableSpots,
  price: tour.price,
  operatorInfo: {
    id: tour.operator.id,
    name:
      `${tour.operator.firstName || ''} ${tour.operator.lastName || ''}`.trim() ||
      'Unknown Operator',
    photo: tour.operator.photo,
  },
  countryAndCity: `${getTranslation(tour.country.translations, 'uk')}, ${getTranslation(
    tour.city.translations,
    'uk',
  )}`,
  date: `${formattedDate(tour.startDate)} — ${formattedDate(tour.endDate)}`,
});
