import type { FC, ReactNode } from 'react';

import { Box, Typography, styled } from '@mui/material';

type SectionTitleProps = {
  children: ReactNode;
  description: string;
};

const TitleWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '24px',
});

export const SectionTitle: FC<SectionTitleProps> = ({
  children,
  description,
}) => {
  return (
    <TitleWrapper>
      {children}
      <Typography variant="bodyLarge" component="p" maxWidth={689}>
        {description}
      </Typography>
    </TitleWrapper>
  );
};
