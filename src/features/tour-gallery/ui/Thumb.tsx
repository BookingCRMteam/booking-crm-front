import type { FC } from 'react';

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
  borderColor: selected ? theme.palette.primaryExtended[700] : 'transparent',

  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
    backgroundColor: 'transparent',
    transition: 'background-color 0.3s ease',
  },

  '&:hover:before': {
    backgroundColor: selected ? 'transparent' : 'rgba(0, 0, 0, 0.2)',
  },
  '&:focus-visible': {
    borderColor: theme.palette.primaryExtended[700],

    '&:before': {
      backgroundColor: selected ? 'transparent' : 'rgba(0, 0, 0, 0.2)',
    },
  },
  '&:active': {
    borderColor: theme.palette.primaryExtended[700],
  },
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
