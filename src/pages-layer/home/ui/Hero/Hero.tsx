'use client';

import Link from 'next/link';

import { Box, Button, Container, Typography, styled } from '@mui/material';

import { AccentHeading } from '../AccentHeading/AccentHeading';
import { STEPS_SECTION_ID } from '../StepsSection/constants';
import { AdvantagesItem } from './AdvantagesItem';
import {
  ADVANTAGES_ITEMS,
  HERO_DESCRIPTION,
  HERO_TITLE_PARTS,
} from './constants';

const HeroWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  margin: '0 auto',
  width: '100%',
  maxWidth: 1440,
  minHeight: '663px',
  backgroundImage: 'url("/images/hero-bg.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  paddingTop: 91,
});

const ContentWrapper = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  gap: '48px',
  width: '100%',
  maxWidth: '595px',
  '& > .MuiTypography-h1': {
    maxWidth: '595px',
  },
});
const DescriptionTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  maxWidth: '520px',
}));
const AdvantagesWrapper = styled(Box)({
  background: 'rgba(54, 54, 54, 0.4)',
  backdropFilter: 'blur(5px)',
});

const AdvantagesItems = styled(Box)({
  padding: '12px 0',
  width: '100%',
  maxWidth: '1040px',
  display: 'flex',
  justifyContent: 'space-between',
  margin: '0 auto',
});

export const Hero = () => {
  return (
    <HeroWrapper>
      <ContentWrapper>
        <AccentHeading variant="h1" parts={HERO_TITLE_PARTS} />
        <DescriptionTypography variant="priceHighlight">
          {HERO_DESCRIPTION}
        </DescriptionTypography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          LinkComponent={Link}
          href={`#${STEPS_SECTION_ID}`}
          sx={{ maxWidth: '331px' }}
        >
          Знайти свою пригоду
        </Button>
      </ContentWrapper>
      <AdvantagesWrapper>
        <AdvantagesItems>
          {ADVANTAGES_ITEMS.map(({ id, ...props }) => (
            <AdvantagesItem key={id} {...props} />
          ))}
        </AdvantagesItems>
      </AdvantagesWrapper>
    </HeroWrapper>
  );
};
