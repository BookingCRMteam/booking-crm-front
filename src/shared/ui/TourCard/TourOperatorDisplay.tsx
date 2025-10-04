import React, { useEffect, useRef, useState } from 'react';

import { Box, Typography } from '@mui/material';

interface TourOperatorDisplayProps {
  operator: string;
}

export const TourOperatorDisplay: React.FC<TourOperatorDisplayProps> = ({
  operator,
}) => {
  const nameRef = useRef<HTMLParagraphElement>(null);
  const [alignStyle, setAlignStyle] = useState<'center' | 'flex-start'>(
    'center',
  );

  useEffect(() => {
    if (nameRef.current) {
      const element = nameRef.current;

      const lineHeight =
        parseFloat(window.getComputedStyle(element).lineHeight) || 18;

      const actualHeight = element.offsetHeight;

      const isWrapped = actualHeight > lineHeight;

      setAlignStyle(isWrapped ? 'flex-start' : 'center');
    }
  }, [operator]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: alignStyle,
        gap: 1,
      }}
    >
      <Typography variant="bodyDefault" component="p">
        Туроператор:
      </Typography>

      <Typography
        variant="bodySmall"
        component="p"
        ref={nameRef}
        sx={{
          overflowWrap: 'break-word',
        }}
      >
        {operator}
      </Typography>
    </Box>
  );
};
