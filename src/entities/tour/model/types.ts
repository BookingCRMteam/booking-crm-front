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
