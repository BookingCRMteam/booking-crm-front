'use client';

import { Box } from '@mui/material';

import { Tours, fetchTours, useInfiniteToursCollection } from '@/entities/tour';

import { ToursCollection } from '@/shared/ui';

import { CatalogEmpty } from './CatalogEmpty';

interface CatalogPageProps {
  initialData: Tours;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ initialData }) => {
  const props = useInfiniteToursCollection({
    initialData,
    queryKey: ['tours', 'catalog'],
    queryFn: fetchTours,
  });

  if (!props.data?.pages?.[0]?.data?.length || props.error) {
    return <CatalogEmpty />;
  }

  return (
    <Box sx={{ pt: '36px', pb: 5 }}>
      <ToursCollection {...props} />
    </Box>
  );
};
