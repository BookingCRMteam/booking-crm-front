'use client';

import Image from 'next/image';

import { Box, Button, Container, Grid, Typography } from '@mui/material';

import {
  ERROR_BUTTON_TEXT,
  ERROR_IMAGE_ALT,
  ERROR_IMAGE_PATH,
  ERROR_SUBTITLE_DESCRIPTION,
  ERROR_SUBTITLE_MESSAGE,
  ERROR_TITLE_MESSAGE,
} from './constants';

type ErrorPageProps = {
  onReset: () => void;
};

export const ErrorPage = ({ onReset }: ErrorPageProps) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '40px',
        padding: '113px 0',
        minHeight: 'calc(100vh - 60px)',
      }}
    >
      <Typography variant="h2" component="h1" align="left">
        {ERROR_TITLE_MESSAGE}
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Image
            src={ERROR_IMAGE_PATH}
            alt={ERROR_IMAGE_ALT}
            width={378}
            height={343}
            priority
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <Typography variant="h3" component="h3">
              {ERROR_SUBTITLE_MESSAGE}
            </Typography>
            {ERROR_SUBTITLE_DESCRIPTION.map((item) => (
              <Typography
                key={item.id}
                variant="bodyLarge"
                sx={{ maxWidth: '375px' }}
                component="p"
              >
                {item.text}
              </Typography>
            ))}
            <Button
              onClick={onReset}
              variant="contained"
              color="primary"
              size="large"
              sx={{ width: 'fit-content' }}
            >
              {ERROR_BUTTON_TEXT}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
