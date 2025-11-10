import { Box } from '@mui/material';

import { Faq } from './Faq/Faq';
import { Hero } from './Hero/Hero';
import { Operators } from './Operators/Operators';
import { OverlapStack } from './OverlapStack';
import { SectionDetail } from './SectionDetail/SectionDetail';
import { SelectionTours } from './SelectionTours/SelectionTours';
import { StepsSection } from './StepsSection/StepsSection';

export const HomePage = () => {
  return (
    <>
      <OverlapStack debug={false}>
        <Box className="section">
          <Hero />
          <StepsSection />
        </Box>
        <Box className="section">
          <SelectionTours />
          <Operators />
        </Box>
        <Box className="section">
          <SectionDetail />
        </Box>
        <Box className="section">
          <Faq />
        </Box>
      </OverlapStack>
    </>
  );
};
