'use client';

import Link from 'next/link';

import {
  Box,
  Button,
  Container,
  type ContainerProps,
  Grid,
  styled,
} from '@mui/material';

import { APP_ROUTE } from '@/shared/constants';

import { AccentHeading } from '../AccentHeading/AccentHeading';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { DetailCard } from './DetailCard';
import { DETAIL_DESCRIPTION, DETAIL_TITLE_PARTS } from './constants';
import { DETAIL_CARDS } from './data';

const DetailWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

const ContentWrapper = styled(Container)<ContainerProps>({
  padding: '60px 0 60px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '48px',
});

export const SectionDetail = () => {
  return (
    <DetailWrapper>
      <ContentWrapper maxWidth="lg" component="section">
        <SectionTitle description={DETAIL_DESCRIPTION}>
          <AccentHeading parts={DETAIL_TITLE_PARTS} variant="h3" />
        </SectionTitle>
        <Grid container spacing={3}>
          {DETAIL_CARDS.map(({ id, ...props }) => (
            <Grid key={id} size={{ md: 4 }}>
              <DetailCard {...props} />
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          component={Link}
          href={APP_ROUTE.CATALOG}
          sx={{ maxWidth: '315px' }}
        >
          До каталогу
        </Button>
      </ContentWrapper>
    </DetailWrapper>
  );
};
