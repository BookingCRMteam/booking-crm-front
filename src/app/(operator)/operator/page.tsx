import type { Metadata } from 'next';

import { OperatorProfilePage } from '@/pages-layer/operator-profile';

export const metadata: Metadata = {
  title: 'Профіль турооператора',
  description: 'Управління профілем турооператора',
};

export default async function Operator() {
  return <OperatorProfilePage />;
}
