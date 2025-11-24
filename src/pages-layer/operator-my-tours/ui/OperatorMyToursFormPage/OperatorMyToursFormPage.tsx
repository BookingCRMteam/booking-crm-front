'use client';

import { Box } from '@mui/material';

import { TourForm } from '@/features/create-edit-tour';

import { APP_ROUTE, DYNAMIC_ROUTE } from '@/shared/constants';
import { BreadCrumbs } from '@/shared/ui';

type OperatorMyToursFormPageProps = {
  tourId?: number;
  operatorId?: number;
};

export const OperatorMyToursFormPage = ({
  tourId,
  operatorId,
}: OperatorMyToursFormPageProps) => {
  const breadcrumbsItems = [
    { href: APP_ROUTE.OPERATOR_TOURS, title: 'Мої тури' },
    {
      href: tourId
        ? DYNAMIC_ROUTE.OPERATOR_TOURS_EDIT(tourId)
        : APP_ROUTE.OPERATOR_TOURS_CREATE,
      title: tourId ? 'Редагувати тур' : 'Додати тур',
    },
  ];

  return (
    <>
      <BreadCrumbs items={breadcrumbsItems} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <TourForm tourId={tourId} operatorId={operatorId} />
      </Box>
    </>
  );
};
