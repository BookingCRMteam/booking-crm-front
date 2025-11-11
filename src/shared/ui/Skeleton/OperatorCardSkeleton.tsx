'use client';

import { Box, styled } from '@mui/material';

import { Skeleton } from './Skeleton';

const SkeletonWrapper = styled(Box)(({ theme }) => ({
  padding: '14px 38px 40px 37px',
  display: 'flex',
  flexDirection: 'column',
  gap: '19px',
  border: `0.50px solid ${theme.palette.gray[400]}`,
  background: theme.palette.common.white,
}));

const TopWrapper = styled(Box)({
  display: 'flex',
  gap: '25px',
});

const TitleWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const OperatorCardSkeleton = () => {
  return (
    <SkeletonWrapper>
      <TopWrapper>
        <Skeleton variant="rectangular" width={45} height={45} />
        <TitleWrapper>
          <Skeleton variant="rectangular" width={133} height={21} />
          <Skeleton variant="rectangular" width={186} height={12} />
        </TitleWrapper>
      </TopWrapper>
      <Skeleton variant="rectangular" width={256} height={112} />
      <Skeleton variant="rectangular" width={256} height={50} />
    </SkeletonWrapper>
  );
};
