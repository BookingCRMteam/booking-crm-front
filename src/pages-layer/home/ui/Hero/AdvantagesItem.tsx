import React, { type FC } from 'react';

import { Box, type BoxProps, Theme, Typography, styled } from '@mui/material';
import { CheckFatIcon } from '@phosphor-icons/react';

import { AdvantagesType } from './constants';

interface AdvantagesStyledProps extends BoxProps {
  isSeparator?: boolean;
  direction: 'left' | 'right' | null;
}

const getSeparatorStyles = (
  theme: Theme,
  isSeparator: boolean = false,
  direction: 'left' | 'right' | null,
) => {
  if (!isSeparator) {
    return {};
  }

  const separatorStyle = {
    border: `2px solid ${theme.palette.common.white}`,
  };

  if (direction === 'right') {
    return {
      paddingRight: '7px',
      borderRight: separatorStyle.border,
    };
  }

  if (direction === 'left') {
    return {
      paddingLeft: '13px',
      borderLeft: separatorStyle.border,
    };
  }

  return {};
};

const AdvantagesStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSeparator' && prop !== 'direction',
})<AdvantagesStyledProps>(({ theme, isSeparator = false, direction }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: theme.palette.common.white,
  ...getSeparatorStyles(theme, isSeparator, direction),
}));

type AdvantagesItemProps = Omit<AdvantagesType, 'id'>;

export const AdvantagesItem: FC<AdvantagesItemProps> = ({
  title,
  ...props
}) => {
  return (
    <AdvantagesStyled {...props}>
      <CheckFatIcon size={24} />
      <Typography variant="priceHighlight">{title}</Typography>
    </AdvantagesStyled>
  );
};
