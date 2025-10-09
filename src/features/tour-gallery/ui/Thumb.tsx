import React, { FC } from 'react';

import Image from 'next/image';

import { Box, Button, styled } from '@mui/material';

import { TourPhoto } from '@/entities/tour/model/types';

type ThumbProp = {
  selected: boolean;
  image: TourPhoto;
  onClick: () => void;
};

const THUMB_SIZE = 65;

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected: boolean }>(({ theme, selected }) => ({
  p: 0,
  borderRadius: '4px',
  width: THUMB_SIZE,
  height: THUMB_SIZE,
  minWidth: 0,
  transition: 'border-color 0.3s',
  overflow: 'hidden',
  position: 'relative',
  cursor: 'grab',
  border: '3px solid',
  borderColor: selected ? theme.palette.primary.main : 'transparent',
}));

export const Thumb: FC<ThumbProp> = ({ image, onClick, selected }) => {
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <StyledButton
        onClick={onClick}
        selected={selected}
        type="button"
        aria-label={`Preview image: ${image.description}`}
        aria-selected={selected}
      >
        <Image
          fill={true}
          src={image.url}
          alt={image.description}
          sizes={`${THUMB_SIZE}px`}
          style={{ borderRadius: selected ? 0 : '4px' }}
        />
      </StyledButton>
    </Box>
  );
};
