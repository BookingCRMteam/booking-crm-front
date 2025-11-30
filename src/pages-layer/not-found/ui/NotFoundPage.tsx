import Image from 'next/image';
import Link from 'next/link';

import { Box, Button, Container, Typography } from '@mui/material';

import { APP_ROUTE, HEADER_HEIGHT } from '@/shared/constants';

import {
  NOT_FOUND_BUTTON_TEXT,
  NOT_FOUND_IMAGE_ALT,
  NOT_FOUND_IMAGE_PATH,
  NOT_FOUND_MESSAGE,
} from './constants';

export const NotFoundPage = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '60px',
        minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
      }}
    >
      <Image
        width={857}
        height={503}
        src={NOT_FOUND_IMAGE_PATH}
        alt={NOT_FOUND_IMAGE_ALT}
        priority
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
        }}
      >
        <Typography variant="h2" component="h1">
          {NOT_FOUND_MESSAGE}
        </Typography>
        <Button
          component={Link}
          href={APP_ROUTE.HOME}
          variant="contained"
          color="primary"
          size="large"
        >
          {NOT_FOUND_BUTTON_TEXT}
        </Button>
      </Box>
    </Container>
  );
};
