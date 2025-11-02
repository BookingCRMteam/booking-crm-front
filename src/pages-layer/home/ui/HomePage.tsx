import { Faq } from './Faq/Faq';
import { Hero } from './Hero/Hero';
import { Operators } from './Operators/Operators';
import { SectionDetail } from './SectionDetail/SectionDetail';
import { SelectionTours } from './SelectionTours/SelectionTours';
import { StepsSection } from './StepsSection/StepsSection';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <StepsSection />
      <SelectionTours />
      <Operators />
      <SectionDetail />
      <Faq />
    </>
  );
};
