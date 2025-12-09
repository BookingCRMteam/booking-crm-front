'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Box, Typography, styled } from '@mui/material';

import { useOperatorQuery } from '@/entities/operator';

import { OperatorPhilosophy } from '../OperatorPhilosophy/OperatorPhilosophy';
import { OperatorProfileEdit } from '../OperatorProfileEdit/OperatorProfileEdit';
import { OperatorProfileHeader } from '../OperatorProfileHeader/OperatorProfileHeader';
import { OperatorProfileInfo } from '../OperatorProfileInfo/OperatorProfileInfo';
import { OperatorRejection } from '../OperatorRejection/OperatorRejection';
import { OperatorTitle } from '../OperatorTitle/OperatorTitle';

const OperatorWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  padding: '80px 0',
  maxWidth: '684px',
  margin: '0 auto',
  minHeight: '100vh',
});

export const OperatorProfile = () => {
  const { data: operator, isLoading, isError } = useOperatorQuery();

  const [isEdit, setIsEdit] = useState(false);

  const photoSrc = operator?.photo || '/images/operator_placeholder.png';
  return (
    <OperatorWrapper>
      <Typography component="h1" variant="h1" align="center">
        Інформація про мене
      </Typography>
      {isLoading ? (
        <Box>Loading...</Box>
      ) : isError ? (
        <Box>Error loading operator data</Box>
      ) : operator ? (
        isEdit ? (
          <OperatorProfileEdit onCancel={() => setIsEdit(false)} />
        ) : (
          <OperatorProfileInfo onEdit={() => setIsEdit(true)}>
            <OperatorProfileHeader>
              <Image
                src={photoSrc}
                alt={`${operator.firstName} ${operator.lastName}`}
                width={180}
                height={180}
              />
              <OperatorTitle {...operator} />
            </OperatorProfileHeader>
            {operator.status === 'rejected' && (
              <OperatorRejection message={operator.rejectionReason} />
            )}
            <OperatorPhilosophy
              description={operator.description}
              philosophy={operator.philosophy}
            />
          </OperatorProfileInfo>
        )
      ) : null}
    </OperatorWrapper>
  );
};
