import { FC } from 'react';

import { Box, Typography } from '@mui/material';

interface LabelProps {
  count: number;
}

const Label: FC<LabelProps> = ({ count }) => {
  const availabilityLabel =
    count === 0
      ? 'Все заброньовано'
      : count > 2
        ? `${count} вільних місць`
        : `2 вільних місця`;
  const labelColor = count === 0 ? '#E29578' : '#00DCCD';
  return (
    <Box
      sx={{
        position: 'absolute',
        p: '3.25px 11px',
        top: 20,
        border: '0.5px solid',
        borderColor: (theme) => theme.palette.primary.main,
        right: 16,
        borderRadius: '4px',
        zIndex: 2,
        boxShadow: '2px 2px 8px 7px rgba(255, 255, 255, 0.2)',
        bgcolor: labelColor,
      }}
    >
      <Typography variant="bodyLarge" component="p">
        {availabilityLabel}
      </Typography>
    </Box>
  );
};

export default Label;
