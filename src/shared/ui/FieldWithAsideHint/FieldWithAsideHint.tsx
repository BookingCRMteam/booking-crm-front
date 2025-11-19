'use client';

import type { FC } from 'react';

import { Box, Typography, styled } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { WarningCircleIcon } from '@phosphor-icons/react';

interface FieldWithAsideHintProps {
  children: React.ReactNode;
  hintText: string;
  describedById: string;
}

const HintWrapper = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.gray[300]}`,
  borderRadius: '4px',
  padding: '2px 4px',
  position: 'absolute',
  left: 'calc(100% + 24px)',
  top: 0,
  width: 200,
  display: 'flex',
  gap: '5px',
  color: '#000',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const FieldWithAsideHint: FC<FieldWithAsideHintProps> = ({
  children,
  hintText,
  describedById,
}) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box id={describedById} sx={visuallyHidden}>
        {hintText}
      </Box>
      <Box aria-describedby={describedById}>{children}</Box>
      <HintWrapper aria-hidden>
        <Box>
          <WarningCircleIcon size="16px" color="#888888" />
        </Box>
        <Typography
          variant="labelCaption"
          component="p"
          sx={{ whiteSpace: 'pre-line' }}
        >
          {hintText}
        </Typography>
      </HintWrapper>

      <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 1 }}>
        <Typography variant="labelCaption" component="p">
          {hintText}
        </Typography>
      </Box>
    </Box>
  );
};
