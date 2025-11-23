import Image from 'next/image';
import Link from 'next/link';

import { Link as MuiLink } from '@mui/material';

import { APP_ROUTE } from '@/shared/constants';

export const AppLogo = () => {
  return (
    <MuiLink
      component={Link}
      href={APP_ROUTE.HOME}
      sx={{
        p: 0,
        fontSize: 0,
        lineHeight: 0,
      }}
    >
      <Image
        src="/images/logo.png"
        width={127}
        height={44}
        alt="Booking CRM logo"
        priority
      />
    </MuiLink>
  );
};
