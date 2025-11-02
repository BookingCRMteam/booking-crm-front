import type { FC } from 'react';

import Link from 'next/link';

import { type LinkProps, Link as MuiLink, styled } from '@mui/material';

interface FooterLinkStyledProps extends LinkProps {
  isSeparator?: boolean;
}

const StyledFooterLink = styled(MuiLink, {
  shouldForwardProp: (prop) => prop !== 'isSeparator',
})<FooterLinkStyledProps>(({ theme, isSeparator }) => ({
  ...theme.typography.labelCaption,
  color: theme.palette.common.black,
  borderLeft: isSeparator ? `1px solid ${theme.palette.common.black}` : 'none',
  paddingLeft: isSeparator ? '3px' : '0',
  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    color: theme.palette.info.main,
  },
  '&:focus-visible': {
    color: theme.palette.info.light,
    outline: `2px solid ${theme.palette.info.light}`,
    outlineOffset: '2px',
  },
  '&:active': {
    color: theme.palette.info.dark,
  },
}));

type FooterLinkProps = {
  href: string;
  name: string;
  isSeparator: boolean;
};
export const FooterLink: FC<FooterLinkProps> = ({
  href,
  name,
  isSeparator,
  ...props
}) => (
  <StyledFooterLink
    component={Link}
    key={href}
    isSeparator={isSeparator}
    underline="none"
    href={href}
    {...props}
  >
    {name}
  </StyledFooterLink>
);
