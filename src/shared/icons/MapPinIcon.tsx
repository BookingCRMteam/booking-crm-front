'use client';

import * as React from 'react';
import type { SVGProps } from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

export const SvgMapPinIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      component={function icon(props: SVGProps<SVGSVGElement>) {
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
              d="M18.75 21h-4.637a25 25 0 0 0 2.2-2.227c2.573-2.96 3.937-6.08 3.937-9.023a8.25 8.25 0 1 0-16.5 0c0 2.944 1.36 6.064 3.938 9.023A25 25 0 0 0 9.887 21H5.25a.75.75 0 1 0 0 1.5h13.5a.75.75 0 1 0 0-1.5M5.25 9.75a6.75 6.75 0 0 1 13.5 0c0 5.365-5.2 9.844-6.75 11.063-1.55-1.22-6.75-5.698-6.75-11.063m10.5 0a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0m-6 0a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0"
            />
          </svg>
        );
      }}
      {...props}
    />
  );
};
export default SvgMapPinIcon;
