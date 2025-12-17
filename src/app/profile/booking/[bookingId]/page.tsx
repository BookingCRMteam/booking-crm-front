import { notFound } from 'next/navigation';

import { TourPage } from '@/pages-layer/tour';

import { getUserBookingById } from '@/entities/booking/api/bookingApi';
import { mapBookingToViewModel } from '@/entities/booking/lib/mapBookingToViewModel';

import { auth0 } from '@/shared/lib/auth0';

interface BookingTourPageProps {
  params: Promise<{
    bookingId: string;
  }>;
}

export default async function BookingTourPage({
  params,
}: BookingTourPageProps) {
  const { bookingId } = await params;
  const bookingIdNum = Number(bookingId);

  if (isNaN(bookingIdNum)) {
    return notFound();
  }

  try {
    const session = await auth0.getSession();
    const accessToken = session?.tokenSet.accessToken;

    if (!session || !accessToken) throw new Error('Unauthorized');
    const booking = await getUserBookingById(bookingIdNum, accessToken);

    if (!booking) {
      return notFound();
    }

    const bookingViewModel = mapBookingToViewModel(booking);

    return (
      <TourPage
        {...bookingViewModel}
        variant="booking"
        bookingId={booking.bookingId}
      />
    );
  } catch (error) {
    console.error('BookingTourPage Error:', error);
    return notFound();
  }
}
