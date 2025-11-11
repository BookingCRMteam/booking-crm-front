import { renderWithTheme } from '@/shared/tests';

import { Steps } from './Steps';
import { STEPS } from './constants';

jest.mock('gsap', () => ({
  registerPlugin: jest.fn(),
}));
jest.mock('gsap/ScrollTrigger', () => ({}));
jest.mock('@gsap/react', () => ({
  useGSAP: jest.fn((fn) => fn()),
}));

jest.mock('./StepCard', () => ({
  StepCard: jest.fn(() => <div data-testid="step-card"></div>),
}));

describe('Steps', () => {
  it('renders all steps', () => {
    const { getAllByTestId } = renderWithTheme(<Steps />);
    const cards = getAllByTestId('step-card');
    expect(cards).toHaveLength(STEPS.length);
  });
});
