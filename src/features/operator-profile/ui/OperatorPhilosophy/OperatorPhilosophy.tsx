import type { FC } from 'react';

import { Box, Typography, styled } from '@mui/material';

import type { OperatorMe } from '@/entities/operator';

type OperatorPhilosophyProps = Pick<OperatorMe, 'philosophy' | 'description'>;

const PhilosophyWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
});

const ArticleWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

const TEXT_PLACEHOLDER = 'Не заповнено';

export const OperatorPhilosophy: FC<OperatorPhilosophyProps> = ({
  philosophy,
  description,
}) => {
  return (
    <PhilosophyWrapper>
      <ArticleWrapper>
        <Typography variant="h3" component="h3">
          Про себе
        </Typography>
        <Typography variant="bodyDefault" component="p">
          {(description && description.trim()) || TEXT_PLACEHOLDER}
        </Typography>
      </ArticleWrapper>
      <ArticleWrapper>
        <Typography variant="h3" component="h3">
          Моя філософія
        </Typography>
        <Typography variant="bodyDefault" component="p">
          {(philosophy && philosophy.trim()) || TEXT_PLACEHOLDER}
        </Typography>
      </ArticleWrapper>
    </PhilosophyWrapper>
  );
};
