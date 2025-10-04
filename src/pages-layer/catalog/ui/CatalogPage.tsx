'use client';

import type { Tours } from '@/entities/tour/model/types';

import { useInfiniteCatalogTours } from '../model/useInfiniteCatalogTours';
import { CatalogPagePure } from './CatalogPagePure';

interface CatalogPageProps {
  initialData: Tours;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ initialData }) => {
  const props = useInfiniteCatalogTours({
    initialData,
  });

  return <CatalogPagePure {...props} />;
};
