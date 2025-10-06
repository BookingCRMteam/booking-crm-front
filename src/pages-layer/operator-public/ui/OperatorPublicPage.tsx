'use client';

import React from 'react';

import Image from 'next/image';

import { Box, CircularProgress, Link, Typography } from '@mui/material';
import { PhoneIcon } from '@phosphor-icons/react';

import { VerifiedBadge } from '@/pages-layer/operator-public/ui/VerifiedBadge';

import { useOperatorWithTours } from '@/entities/operator/model/useOperatorWithTours';

export const OperatorPublicPage = ({ id }: { id: string }) => {
  const { operator, isLoading } = useOperatorWithTours(id);

  const formatPhone = (phone?: string) => {
    if (!phone) return '';
    const cleanPhone = phone.startsWith('+38') ? phone.slice(3) : phone;
    const digits = cleanPhone.replace(/\D/g, '');
    if (digits.length !== 10) return cleanPhone;
    return digits.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
  };

  if (isLoading)
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size={48} />
      </Box>
    );

  return (
    <>
      <Box component="section" sx={{ display: 'flex', gap: '111px' }}>
        <Box sx={{ py: 5 }}>
          <Image
            src={operator?.photo || '/images/placeholder_img.png'}
            alt={operator?.firstName || 'Placeholder image'}
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
            <Typography
              variant="h2"
              sx={{ mb: 0.5 }}
            >{`${operator?.firstName} ${operator?.lastName}`}</Typography>
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
              <Link
                href={`tel:${operator?.phone}`}
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
                  {formatPhone(operator?.phone)}
                </Typography>
              </Link>
            </Box>
          </Box>
          <Box>
            <Typography variant="h3" sx={{ mb: '20px' }}>
              Про себе
            </Typography>
            <Typography variant="bodyDefault">
              {operator?.description}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h3" sx={{ mb: '20px' }}>
              Моя філософія
            </Typography>
            <Typography variant="bodyDefault">
              {operator?.philosophy}
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
