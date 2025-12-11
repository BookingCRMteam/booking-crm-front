'use client';

import Image from 'next/image';

import { Box, Typography } from '@mui/material';

import { OperatorMe } from '@/entities/operator/api/types';

import { OperatorStatusBadge, Phone } from '@/shared/ui';
import { formattedPhone } from '@/shared/utils';

const sectionStyles = {
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  justifyContent: 'center',
  alignItems: 'center',
  gap: { xs: 5, md: '111px' },
  py: 5,
};

const imageWrapper = {
  borderRadius: '4px',
  overflow: 'hidden',
  width: '331px',
  height: 'auto',
};

const columnStyles = {
  maxWidth: { xs: '100%', md: '508px' },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: { xs: 'center', md: 'start' },
  alignItems: { xs: 'center', md: 'start' },
  textAlign: { xs: 'center', md: 'start' },
  gap: 3,
};

const badgePhoneContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: { xs: '20px', md: '164px' },
  flexWrap: { xs: 'wrap', md: 'nowrap' },
  whiteSpace: { xs: 'normal', md: 'nowrap' },
};

const textBlockStyles = {
  wordBreak: 'break-word',
};

export const OperatorHeader = ({ operator }: { operator: OperatorMe }) => {
  const secureUrl = operator.photo?.replace(/^http:\/\//, 'https://');

  const phoneDisplay = formattedPhone(operator.phone);

  return (
    <Box component="section" sx={sectionStyles}>
      <Box sx={imageWrapper}>
        <Image
          src={secureUrl || '/images/operator_public_placeholder.png'}
          alt={
            secureUrl
              ? `${operator.firstName} ${operator.lastName}`
              : 'Placeholder image'
          }
          width={331}
          height={331}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
      </Box>

      <Box sx={columnStyles}>
        <Box sx={textBlockStyles}>
          <Typography variant="h2" sx={{ mb: 0.5 }}>
            {`${operator.firstName} ${operator.lastName}`}
          </Typography>
          <Box sx={badgePhoneContainerStyles}>
            <OperatorStatusBadge status={operator.status} />
            {phoneDisplay.length > 0 && <Phone phone={phoneDisplay} />}
          </Box>
        </Box>
        <Box sx={textBlockStyles}>
          <Typography variant="h3" sx={{ mb: '20px' }}>
            Про себе
          </Typography>
          <Typography variant="bodyDefault">
            {operator.description || 'Не заповнено'}
          </Typography>
        </Box>
        <Box sx={textBlockStyles}>
          <Typography variant="h3" sx={{ mb: '20px' }}>
            Моя філософія
          </Typography>
          <Typography variant="bodyDefault">
            {operator.philosophy || 'Не заповнено'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
