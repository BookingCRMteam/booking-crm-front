import type { ReactNode } from 'react';

import type { InfiniteData } from '@tanstack/react-query';

import type { TourCardVariantType } from '@/shared/ui/TourCard/types';

import { PaginatedResponse } from './useInfiniteToursCollection';

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
  bookedSpots: number;
  totalSpots: number;
  conditions: string | null;
  isActive: boolean;
  isFeatured: boolean;
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
  philosophy: string;
  photo: string | null;
  rejectionReason: string | null;
};

export type TourPhoto = {
  id: number;
  tourId: number;
  url: string;
  isMain: boolean;
  description: string | null;
};

export type TourPhotoForm = {
  id: number;
  url?: string | null;
  file?: File | null;
  isMain: boolean;
  description?: string | null;
};

export type UpdatePhotoMeta = {
  isMain?: boolean;
  description?: string;
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

export type ToursCollectionProps<T = Tour> = {
  data: InfiniteData<PaginatedResponse<T>> | null;
  isFetchingNextPage: boolean;
  ref: (node?: Element | null) => void;
  error: Error | null;
  variantTourCard?: TourCardVariantType;
  children?: ReactNode;
};
