import { Container } from '@mui/material';

import { ProfilePage } from '@/pages-layer/profile';

import { authGuard } from '@/features/auth';

import { APP_ROUTE } from '@/shared/constants';

export default async function Profile() {
  await authGuard(APP_ROUTE.PROFILE, ['traveler']);
  return (
    <Container maxWidth="lg">
      <ProfilePage />
    </Container>
  );
}
