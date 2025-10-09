import type { FC } from 'react';

import { Box, Typography, type TypographyProps, styled } from '@mui/material';

type PriceDisplayProps = {
  price: string;
};

const PriceContainer = styled(Box)({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
});

const CurrencySymbol = styled(Typography)<TypographyProps>({
  padding: '0 4px 0 8px',
});

export const PriceDisplay: FC<PriceDisplayProps> = ({ price }) => (
  <PriceContainer>
    <CurrencySymbol variant="priceHighlight" component="p">
      &#x20B4;
    </CurrencySymbol>
    <Typography variant="priceHighlight" component="p">
      {price}
    </Typography>
    <Typography variant="priceHighlight" component="p">
      (за двох)
    </Typography>
  </PriceContainer>
);
