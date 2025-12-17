import { notFound } from 'next/navigation';

import { TourPage } from '@/pages-layer/tour';

import { getUserBookingById } from '@/entities/booking/api/bookingApi';
import { mapTourBookingToViewModel } from '@/entities/tour/lib/mapTourBookingToViewModel';

import { auth0 } from '@/shared/lib/auth0';

interface TourPageProps {
  params: Promise<{
    tourId: string;
  }>;
}

export default async function BookingTourPage({ params }: TourPageProps) {
  const { tourId } = await params;
  const tourIdNum = Number(tourId);

  if (isNaN(tourIdNum)) {
    return notFound();
  }

  try {
    const session = await auth0.getSession();
    const accessToken = session?.tokenSet.accessToken;

    if (!session || !accessToken) throw new Error('Unauthorized');
    const booking = await getUserBookingById(tourIdNum, accessToken);

    if (!booking) {
      return notFound();
    }

    const tourViewModel = mapTourBookingToViewModel(booking);

    return (
      <TourPage
        {...tourViewModel}
        variant="booking"
        bookingId={booking.bookingId}
      />
    );
  } catch (error) {
    console.error('BookingTourPage Error:', error);
    return notFound();
  }
}
