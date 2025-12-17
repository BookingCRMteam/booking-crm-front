'use client';

import { Box, Container, styled } from '@mui/material';

import { CoupleBooking } from '@/features/couple-booking/ui/CoupleBooking';
import { CoupleProfileEditing } from '@/features/couple-profile-editing';

import { BreadCrumbs } from '@/shared/ui';

const BREADCRUMBS_ITEMS = [
  { href: '/', title: 'Головна' },
  { href: '/profile', title: 'Наш профіль' },
];

const CoupleWrapper = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  gap: '13px',
  paddingBottom: '60px',
  minHeight: '100vh',
});

const ContentWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '41px',
});

export const CouplePage = () => {
  return (
    <CoupleWrapper maxWidth="lg">
      <BreadCrumbs items={BREADCRUMBS_ITEMS} />
      <ContentWrapper>
        <CoupleProfileEditing />
        <CoupleBooking />
      </ContentWrapper>
    </CoupleWrapper>
  );
};
