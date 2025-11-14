'use client';

import { Box, styled } from '@mui/material';

import { OperatorOnboardingForm } from '@/features/operator-onboarding';

const BackgroundWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.light[50],
  padding: '17px 0 20px',
}));

export const OperatorOnboardingPage = () => {
  return (
    <BackgroundWrapper>
      <OperatorOnboardingForm />
    </BackgroundWrapper>
  );
};
