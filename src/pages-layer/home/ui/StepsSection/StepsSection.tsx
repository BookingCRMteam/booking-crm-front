'use client';

import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled,
} from '@mui/material';

import { AccentHeading } from '../AccentHeading/AccentHeading';
import { Steps } from './Steps';
import { STEPS_SECTION_ID, STEPS_TITLE_PARTS } from './constants';

const ContentWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  '& > .MuiTypography-h3': {
    maxWidth: '685px',
  },
});

export const StepsSection = () => {
  return (
    <Container component="section" maxWidth="lg" id={STEPS_SECTION_ID}>
      <Grid
        container
        spacing={3}
        sx={{
          padding: '70px 0 60px',
        }}
      >
        <Grid size={{ md: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '68px' }}>
            <Typography variant="bodyLarge" component="p">
              Ми створили простий та надійний процес, щоб ви могли зосередитись
              на найважливішому — ваших спільних враженнях.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ maxWidth: '331px' }}
            >
              Знайти свою пригоду
            </Button>
          </Box>
        </Grid>
        <Grid size={{ md: 8 }}>
          <ContentWrapper>
            <AccentHeading variant={'h3'} parts={STEPS_TITLE_PARTS} />
            <Steps />
          </ContentWrapper>
        </Grid>
      </Grid>
    </Container>
  );
};
