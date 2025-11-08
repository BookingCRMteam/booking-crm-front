import type { FC } from 'react';

import { Box, Typography } from '@mui/material';
import { PhoneIcon } from '@phosphor-icons/react/dist/ssr/Phone';

type PhoneProps = {
  phone: string;
};

export const Phone: FC<PhoneProps> = ({ phone }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
      }}
    >
      <PhoneIcon size={24} weight="regular" color="currentColor" />
      <Typography variant="bodyLarge" component="p">
        {phone}
      </Typography>
    </Box>
  );
};
