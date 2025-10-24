import type { FC } from 'react';

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { IconButton, styled } from '@mui/material';

type GalleryNavButtonProps = {
  direction: 'prev' | 'next';
  ariaLabel: string;
  onClick: () => void;
};

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'direction',
})<{
  direction: 'prev' | 'next';
}>(({ theme, direction }) => ({
  position: 'absolute',
  zIndex: 5,
  left: '19px',
  backgroundColor: theme.palette.light[100],
  borderRadius: '50%',
  padding: '2px',
  transform: direction === 'prev' ? 'translateY(0)' : 'translateY(-50%)',
  ...(direction === 'prev' ? { top: 0 } : { bottom: '-27px' }),
  '&:hover': {
    backgroundColor: theme.palette.light[200],
  },
  '&:focus-visible': {
    backgroundColor: theme.palette.light[300],
  },
  '&:active': {
    backgroundColor: theme.palette.light[400],
  },
  '&:disabled': {
    backgroundColor: theme.palette.gray[300],
  },
}));

const StyledIcon = styled(ArrowBackIosRoundedIcon, {
  shouldForwardProp: (prop) => prop !== 'direction',
})<{
  direction: 'prev' | 'next';
}>(({ direction }) => ({
  rotate: direction === 'prev' ? '90deg' : '-90deg',
}));

export const GalleryNavButton: FC<GalleryNavButtonProps> = ({
  direction,
  onClick,
  ariaLabel,
}) => (
  <StyledIconButton
    direction={direction}
    onClick={onClick}
    aria-label={ariaLabel}
  >
    <StyledIcon direction={direction} />
  </StyledIconButton>
);
