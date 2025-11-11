'use client';

import { Box, Container, Grid, styled } from '@mui/material';

import { useGetOperatorPopularQuery } from '@/entities/operator';

import { OperatorCardSkeleton } from '@/shared/ui';

import { AccentHeading } from '../AccentHeading/AccentHeading';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { SKELETON_ARRAY } from '../constants';
import { OperatorCard } from './OperatorCard';
import { OPERATOR_DESCRIPTION, OPERATOR_TITLE_PARTS } from './constants';

const BgWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
}));

const OperatorWrapper = styled(Container)({
  padding: '60px 0 59px',
  display: 'flex',
  flexDirection: 'column',
  gap: '22px',
  minHeight: '515px',
});

export const Operators = () => {
  const { data, isLoading, isSuccess, isError } = useGetOperatorPopularQuery({
    limit: 3,
  });
  return (
    <BgWrapper>
      <OperatorWrapper maxWidth="lg">
        <SectionTitle description={OPERATOR_DESCRIPTION}>
          <AccentHeading variant="h3" parts={OPERATOR_TITLE_PARTS} />
        </SectionTitle>
        <Grid container spacing={2.5}>
          {(isLoading || isError) &&
            SKELETON_ARRAY.map((skeleton) => (
              <Grid key={skeleton.id} size={{ md: 4 }}>
                <OperatorCardSkeleton />
              </Grid>
            ))}
          {isSuccess &&
            data.map((operator) => (
              <Grid key={operator.id} size={{ md: 4 }}>
                <OperatorCard {...operator} />
              </Grid>
            ))}
        </Grid>
      </OperatorWrapper>
    </BgWrapper>
  );
};
