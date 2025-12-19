import { BookingStatus, UserBooking } from '@/entities/booking';

import { formattedDate } from '@/shared/utils';

import { TourPhoto } from '../../tour/model/types';

type BookingViewModel = {
  id: number;
  title: string;
  description: string;
  photos: Pick<TourPhoto, 'url' | 'description' | 'isMain'>[];
  availableSpots: number;
  price: string;
  operatorInfo: {
    id: number;
    name: string;
    photo: string | null;
  };
  countryAndCity: string;
  date: string;
  bookingId: number;
  bookingStatus: BookingStatus;
};

export const mapBookingToViewModel = ({
  tour,
  bookingPrice,
  bookingId,
  status,
}: UserBooking): BookingViewModel => ({
  id: tour.id,
  title: tour.title,
  description: tour.description,
  photos: tour.photos,
  availableSpots: tour.availableSpots,
  price: bookingPrice,
  operatorInfo: {
    id: tour.operator.id,
    name:
      `${tour.operator.firstName || ''} ${tour.operator.lastName || ''}`.trim() ||
      'Unknown Operator',
    photo: tour.operator.photo,
  },
  countryAndCity: `${tour.country.name || 'Unknown'}, ${tour.city.name || 'Unknown'}`,
  date: `${formattedDate(tour.startDate)} — ${formattedDate(tour.endDate)}`,
  bookingId,
  bookingStatus: status,
});
