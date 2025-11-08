'use client';

import { OperatorById } from '@/entities/operator/api/types';
import { Tours } from '@/entities/tour';

import { APP_ROUTE, DYNAMIC_ROUTE } from '@/shared/constants';
import { BreadCrumbs } from '@/shared/ui';

import { OperatorHeader } from '../OperatorHeader/OperatorHeader';
import { OperatorTours } from '../OperatorTours/OperatorTours';

type OperatorPublicPageProps = {
  operator: OperatorById;
  initialTours: Tours;
};

export const OperatorPublicPage = ({
  operator,
  initialTours,
}: OperatorPublicPageProps) => {
  const { id, firstName, lastName } = operator;

  const breadcrumbsItems = [
    { href: APP_ROUTE.HOME, title: 'Головна' },
    { href: APP_ROUTE.CATALOG, title: 'Каталог' },
    {
      href: DYNAMIC_ROUTE.OPERATOR_PUBLIC(id),
      title: `Туроператор ${firstName} ${lastName}`,
    },
  ];

  return (
    <>
      <BreadCrumbs items={breadcrumbsItems} />
      <OperatorHeader operator={operator} />
      <OperatorTours initialData={initialTours} operatorId={id} />
    </>
  );
};
