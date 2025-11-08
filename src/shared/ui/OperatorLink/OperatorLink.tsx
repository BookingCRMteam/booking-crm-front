'use client';

import type { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
  Box,
  LinkProps,
  Link as MuiLink,
  Typography,
  styled,
} from '@mui/material';

import { DYNAMIC_ROUTE } from '@/shared/constants';

interface OperatorLinkWrapperProps extends LinkProps {
  isCardVariant: boolean;
}

const StyledLink = styled(MuiLink, {
  shouldForwardProp: (prop) => prop !== 'isCardVariant',
})<OperatorLinkWrapperProps>(({ theme, isCardVariant }) => ({
  borderTop: `1px solid ${theme.palette.gray[200]}`,
  padding: isCardVariant ? '7px 8px 0' : '7px 8px 8px 8px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: isCardVariant
    ? theme.palette.common.white
    : theme.palette.text.primary,

  '&:hover': {
    color: isCardVariant ? theme.palette.info.light : theme.palette.info.main,
  },
  '&:active': {
    color: theme.palette.info.dark,
  },
  '&:focus-visible': {
    color: isCardVariant ? theme.palette.info.light : theme.palette.info.main,
    textDecoration: 'underline',
    outline: 'none',
  },
}));

const TextContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export interface OperatorLinkProps {
  id: number;
  name: string;
  photo: string | null;
  variant: 'card' | 'page';
}

export const OperatorLink: FC<OperatorLinkProps> = ({
  id,
  name,
  photo,
  variant,
}) => {
  const operatorHref = DYNAMIC_ROUTE.OPERATOR_PUBLIC(id);
  const operatorPhotoSrc = photo || '/images/operator_placeholder.png';
  const isCardVariant = variant === 'card';
  const imageSize = isCardVariant ? 32 : 36;
  return (
    <StyledLink
      data-testid="operator-link"
      isCardVariant={isCardVariant}
      component={Link}
      underline="none"
      href={operatorHref}
    >
      <Image
        width={imageSize}
        height={imageSize}
        src={operatorPhotoSrc}
        alt={name}
        style={{ objectFit: 'cover', borderRadius: '4px' }}
      />
      <TextContainer>
        <Typography variant="bodyDefault" component="p">
          Туроператор:
        </Typography>
        <Typography variant="bodySmall" component="p">
          {name}
        </Typography>
      </TextContainer>
    </StyledLink>
  );
};
