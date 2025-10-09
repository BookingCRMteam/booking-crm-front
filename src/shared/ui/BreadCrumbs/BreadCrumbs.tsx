import React, { FC } from 'react';

import Link from 'next/link';

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Breadcrumbs, Link as MuiLink, Typography } from '@mui/material';

export type BreadCrumbsItem = {
  title: string;
  href: string;
};

export type BreadCrumbsProps = {
  items: BreadCrumbsItem[];
};

export const BreadCrumbs: FC<BreadCrumbsProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }
  const lastItem = items[items.length - 1];
  const crumbs = items.slice(0, -1);
  return (
    <Breadcrumbs
      separator={<ArrowForwardIosRoundedIcon sx={{ fontSize: '16px' }} />}
      aria-label="breadcrumb"
    >
      {crumbs.map(({ href, title }) => (
        <MuiLink
          key={href}
          component={Link}
          underline="none"
          variant="breadcrumbLink"
          href={href}
        >
          {title}
        </MuiLink>
      ))}

      <Typography variant="labelCaption" color="textPrimary" component="p">
        {lastItem.title}
      </Typography>
    </Breadcrumbs>
  );
};
