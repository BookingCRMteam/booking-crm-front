import { CouplePage } from '@/pages-layer/couple';

import { authGuard } from '@/features/auth';

import { APP_ROUTE } from '@/shared/constants';

export default async function Profile() {
  await authGuard(APP_ROUTE.PROFILE, ['traveler']);
  return <CouplePage />;
}
