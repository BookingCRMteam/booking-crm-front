import { notFound } from 'next/navigation';

import { TourPage } from '@/pages-layer/tour';

import { fetchTour } from '@/entities/tour/api/toursApi';

interface TourPageProps {
  params: Promise<{
    tourId: string;
  }>;
}

export default async function Tour({ params }: TourPageProps) {
  const { tourId } = await params;

  const tour = await fetchTour(Number(tourId));

  if (!tour) {
    return notFound();
  }

  return <TourPage tour={tour} />;
}
