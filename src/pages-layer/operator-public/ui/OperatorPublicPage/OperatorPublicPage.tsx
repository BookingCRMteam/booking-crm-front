import React from 'react';

import { OperatorById } from '@/entities/operator/api/types';

import { OperatorHeader } from '../OperatorHeader/OperatorHeader';

interface OperatorPublicPageProps {
  operator: OperatorById;
}

export const OperatorPublicPage = ({ operator }: OperatorPublicPageProps) => {
  return (
    <>
      <OperatorHeader operator={operator} />
    </>
  );
};
