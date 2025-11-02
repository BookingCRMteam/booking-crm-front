'use client';

import React, { useState } from 'react';

import { Box, styled } from '@mui/material';

import { StepCard } from './StepCard';
import { STEPS } from './constants';

const StepsWrapper = styled(Box)({
  display: 'flex',
  width: '100%',
  gap: '9px',
  justifyContent: 'flex-end',
});

export const Steps = () => {
  const [select, setSelect] = useState(0);
  const handleChangeSelect = (step: number) => setSelect(step);
  return (
    <StepsWrapper>
      {STEPS.map((card) => (
        <StepCard
          key={card.id}
          selected={select === card.id}
          {...card}
          onClick={handleChangeSelect}
        />
      ))}
    </StepsWrapper>
  );
};
