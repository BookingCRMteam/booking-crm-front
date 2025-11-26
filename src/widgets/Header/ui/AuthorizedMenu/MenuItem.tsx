import type { FC, ReactNode } from 'react';

import Link from 'next/link';

import { Typography } from '@mui/material';

import { RouteHref } from './constants';
import { MuLinkStyled } from './styled';

type MenuItemProps = {
  name: string;
  href: RouteHref | string;
  icon: ReactNode;
  onClose: () => void;
  isDefaultLink?: boolean;
};

export const MenuItem: FC<MenuItemProps> = ({
  href,
  icon,
  name,
  onClose,
  isDefaultLink = false,
}) => {
  return (
    <MuLinkStyled
      component={isDefaultLink ? 'a' : Link}
      href={href}
      onClick={onClose}
      underline="none"
    >
      {icon}
      <Typography variant="bodyLarge">{name}</Typography>
    </MuLinkStyled>
  );
};
