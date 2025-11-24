'use client';

import { useOperatorQuery } from '@/entities/operator';

import { OperatorMyTours } from '../OperatorMyTours/OperatorMyTours';

export const OperatorMyToursPage = () => {
  const { data: operator } = useOperatorQuery();
  const operatorId = operator?.id;

  if (!operatorId) return null;

  return <OperatorMyTours operatorId={operatorId} />;
};
