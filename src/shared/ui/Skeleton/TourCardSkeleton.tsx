'use client';

import { Box, styled } from '@mui/material';

import { Skeleton } from './Skeleton';

const SkeletonWrapper = styled(Box)(({ theme }) => ({
  padding: '0 0 28px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  background: theme.palette.common.white,
}));

const TopWrapper = styled(Box)({
  display: 'flex',
  gap: '23px',
});

const TitleWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const TourCardSkeleton = () => {
  return (
    <SkeletonWrapper>
      <Skeleton variant="rectangular" width={332} height={436} />
      <TopWrapper>
        <Skeleton variant="rectangular" width={45} height={45} />
        <TitleWrapper>
          <Skeleton variant="rectangular" width={166} height={21} />
          <Skeleton variant="rectangular" width={216} height={16} />
        </TitleWrapper>
      </TopWrapper>
      <Skeleton variant="rectangular" width={284} height={63} />
    </SkeletonWrapper>
  );
};
