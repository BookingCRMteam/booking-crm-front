import type { TourCardVariantType } from '@/shared/ui/TourCard/types';

import { useInfiniteToursCollection } from './useInfiniteToursCollection';

export type TourPhotoBack = {
  id: number;
  url: string;
  isMain: boolean;
  description?: string | null;
  tourId?: number;
};

export type BackendTour = {
  id: number;
  title: string;
  description: string;
  countryISO2Code: string;
  cityId: number;
  availableSpots: number;
  price: string;
  currency: string;
  startDate: string;
  endDate: string;
  photos: TourPhotoBack[];
};

export type TourPhotoFront = {
  id: string;
  url?: string | null;
  file?: File | null;
  isMain: boolean;
};

export type Tour = {
  id: number;
  operatorId: number;
  title: string;
  description: string;
  countryISO2Code: string;
  cityId: number;
  type: string | null;
  price: string;
  currency: string;
  startDate: string;
  endDate: string;
  availableSpots: number;
  conditions: string | null;
  isActive: boolean;
  adults: number;
  children: number;
  petsAllowed: boolean;
  departureCityId: string | null;
  departureCountryISO2Code: string | null;
  createdAt: string;
  updatedAt: string;
  photos: TourPhoto[];
  operator: TourOperator;
  country: {
    id: number;
    iso2: string;
    iso3: string;
    translations: {
      id: number;
      countryIso2: string;
      languageCode: string;
      name: string;
    }[];
  };
  city: {
    id: number;
    countryIso2: string;
    translations: {
      id: number;
      cityId: number;
      languageCode: string;
      name: string;
    }[];
  };
  departureCity: string | null;
};

type TourOperator = {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  companyName: string;
  description: string;
  firstName: string;
  lastName: string;
  website: string;
  phone: string;
  status: 'approved' | 'pending' | 'rejected';
  philosophy: string | null;
  photo: string | null;
};

export type TourPhoto = {
  id: number;
  tourId: number;
  url: string;
  isMain: boolean;
  description: string;
};

export type Tours = {
  meta: {
    total: string;
    limit: number;
    offset: number;
  };
  data: Tour[];
  message: string;
};

export type TourDetail = {
  message: string;
  data: Tour;
};

export type TourBookingInfo = {
  tourId: number;
  title: string;
  countryAndCity: string;
  date: string;
  price: string;
};

export type ToursCollectionProps = ReturnType<
  typeof useInfiniteToursCollection
> & {
  variantTourCard?: TourCardVariantType;
};
