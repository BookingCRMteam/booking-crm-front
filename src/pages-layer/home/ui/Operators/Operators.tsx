'use client';

import { Box, Container, Grid, styled } from '@mui/material';

import { useGetOperatorPopularQuery } from '@/entities/operator';

import { AccentHeading } from '../AccentHeading/AccentHeading';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { OperatorCard } from './OperatorCard';
import { OPERATOR_DESCRIPTION, OPERATOR_TITLE_PARTS } from './constants';

const OperatorWrapper = styled(Container)({
  padding: '60px 0 59px',
  display: 'flex',
  flexDirection: 'column',
  gap: '22px',
});

export const Operators = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetOperatorPopularQuery({
      limit: 3,
    });
  return (
    <OperatorWrapper maxWidth="lg">
      <SectionTitle description={OPERATOR_DESCRIPTION}>
        <AccentHeading variant="h3" parts={OPERATOR_TITLE_PARTS} />
      </SectionTitle>
      <Grid container spacing={2.5}>
        {isLoading && (
          <Grid size={12}>
            <Box>Loading...</Box>
          </Grid>
        )}
        {isError && (
          <Grid size={12}>
            <Box>Error loading operators: {error?.message}</Box>
          </Grid>
        )}
        {isSuccess &&
          data.map((operator) => (
            <Grid key={operator.id} size={{ md: 4 }}>
              <OperatorCard {...operator} />
            </Grid>
          ))}
      </Grid>
    </OperatorWrapper>
  );
};
