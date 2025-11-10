'use client';

import Link from 'next/link';

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
import {
  STEPS_SECTION_BUTTON_TEXT,
  STEPS_SECTION_ID,
  STEPS_SECTION_TITLE,
  STEPS_TITLE_PARTS,
} from './constants';

const StepsWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
}));

const ContentWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
});

export const StepsSection = () => {
  return (
    <StepsWrapper>
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
                {STEPS_SECTION_TITLE}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                LinkComponent={Link}
                href={`#${STEPS_SECTION_ID}`}
                sx={{ maxWidth: '331px' }}
              >
                {STEPS_SECTION_BUTTON_TEXT}
              </Button>
            </Box>
          </Grid>
          <Grid size={{ md: 8 }}>
            <ContentWrapper>
              <AccentHeading
                variant={'h3'}
                parts={STEPS_TITLE_PARTS}
                maxWidth="685px"
              />
              <Steps />
            </ContentWrapper>
          </Grid>
        </Grid>
      </Container>
    </StepsWrapper>
  );
};
