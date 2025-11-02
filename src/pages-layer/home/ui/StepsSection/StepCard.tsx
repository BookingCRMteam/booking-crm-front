import type { FC } from 'react';

import {
  Box,
  type BoxProps,
  Typography,
  type TypographyProps,
  styled,
} from '@mui/material';

import type { StepCardType } from './constants';

type StepCardProps = StepCardType & {
  selected: boolean;
  onClick: (step: number) => void;
};

type CardWrapperProps = BoxProps & {
  selected: boolean;
};

type CardNumberProps = TypographyProps & {
  selected: boolean;
};

const ContentWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<CardWrapperProps>(({ selected }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '395px',

  transform: selected ? 'scaleX(1)' : 'scaleX(0)',
  transformOrigin: 'left center',
  opacity: selected ? 1 : 0,
  overflow: 'hidden',

  transition: 'transform 0.3s ease-in-out, opacity 0.3s 0.2s ease-in-out',
}));

const CardWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<CardWrapperProps>(({ theme, selected }) => ({
  width: selected ? 507 : 80,
  height: 240,
  backgroundColor: theme.palette.secondary.main,
  padding: 20,
  overflow: 'hidden',
  display: 'flex',
  gap: selected ? '8px' : '0px',
  transition: 'width 0.3s ease-in-out, gap 0.3s ease-in-out',
}));

const CardNumber = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<CardNumberProps>(({ theme, selected }) => ({
  ...theme.typography.h1,
  fontSize: 44,
  display: 'block',
  color: selected ? theme.palette.primary.main : theme.palette.common.black,
  minWidth: selected ? '64px' : '40px',
  height: selected ? '53px' : 'auto',
  transition: 'all 0.3s ease-in-out',
}));

const CardTitle = styled(Typography)({
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'break-word',
});

const CardDescription = styled(Typography)({
  display: '-webkit-box',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'break-word',
});

export const StepCard: FC<StepCardProps> = ({
  selected,
  number,
  description,
  title,
  onClick,
  id,
}) => {
  const handleOnClick = () => onClick(id);
  return (
    <CardWrapper selected={selected} onClick={handleOnClick}>
      <CardNumber selected={selected} align="center">
        {number}
      </CardNumber>
      <ContentWrapper selected={selected}>
        <CardTitle variant="h3" color="primary">
          {title}
        </CardTitle>
        <CardDescription variant="bodyLarge" color="textPrimary">
          {description}
        </CardDescription>
      </ContentWrapper>
    </CardWrapper>
  );
};
