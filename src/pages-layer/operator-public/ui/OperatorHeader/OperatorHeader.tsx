'use client';

import React from 'react';

import Image from 'next/image';

import { Box, Link, Typography } from '@mui/material';
import { PhoneIcon } from '@phosphor-icons/react';

import { VerifiedBadge } from '@/pages-layer/operator-public/ui/VerifiedBadge/VerifiedBadge';

import { OperatorById } from '@/entities/operator/api/types';

import { formattedPhone } from '@/shared/utils';

export const OperatorHeader = ({ operator }: { operator: OperatorById }) => {
  const secureUrl = operator.photo?.replace(/^http:\/\//, 'https://');

  const phoneDisplay = formattedPhone(operator.phone);

  return (
    <>
      <Box component="section" sx={{ display: 'flex', gap: '111px' }}>
        <Box sx={{ py: 5 }}>
          <Image
            src={secureUrl || '/images/placeholder_img.png'}
            alt={operator.firstName || 'Placeholder image'}
            width={331}
            height={331}
          />
        </Box>
        <Box
          sx={{
            maxWidth: '508px',
            pt: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="h2" sx={{ mb: 0.5 }}>
              {operator.firstName || operator.lastName
                ? `${operator.firstName || ''} ${operator.lastName || ''}`.trim()
                : 'Оператор'}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '201px',
                flexWrap: 'nowrap',
                whiteSpace: 'nowrap',
              }}
            >
              <VerifiedBadge />
              {operator.phone && (
                <Link
                  href={`tel:${operator.phone}`}
                  underline="none"
                  color="inherit"
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  <PhoneIcon size={24} />
                  <Typography variant="bodyLarge" sx={{ whiteSpace: 'nowrap' }}>
                    {phoneDisplay}
                  </Typography>
                </Link>
              )}
            </Box>
          </Box>
          <Box>
            <Typography variant="h3" sx={{ mb: '20px' }}>
              Про себе
            </Typography>
            <Typography variant="bodyDefault">
              {operator.description || '—'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h3" sx={{ mb: '20px' }}>
              Моя філософія
            </Typography>
            <Typography variant="bodyDefault">
              {operator.philosophy || '—'}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ pt: 5, pb: '20px' }}>
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          Актуальні подорожі ()
        </Typography>
      </Box>
    </>
  );
};
