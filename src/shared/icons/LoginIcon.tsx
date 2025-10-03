'use client';

import * as React from 'react';
import type { SVGProps } from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

const IconComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M10.992 14.805a5.625 5.625 0 1 0-6.234 0A9 9 0 0 0 .33 18.34a.75.75 0 1 0 1.256.82 7.5 7.5 0 0 1 12.576 0 .75.75 0 0 0 1.256-.82 9 9 0 0 0-4.427-3.535m-7.242-4.68a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0m19.7 9.253a.75.75 0 0 1-1.037-.218 7.49 7.49 0 0 0-6.288-3.41.75.75 0 1 1 0-1.5 4.125 4.125 0 1 0-1.532-7.956.75.75 0 1 1-.557-1.393 5.625 5.625 0 0 1 5.206 9.904 9 9 0 0 1 4.427 3.535.75.75 0 0 1-.218 1.038"
      />
    </svg>
  );
};
const SvgLoginIcon: React.FC<SvgIconProps> = (props) => {
  return <SvgIcon component={IconComponent} {...props} />;
};
export default SvgLoginIcon;
