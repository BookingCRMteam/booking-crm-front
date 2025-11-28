import '@testing-library/jest-dom';

// eslint-disable-next-line @typescript-eslint/no-require-imports
jest.mock('next/image', () => require('./src/jest/mocks/nextImage'));

jest.mock('gsap', () => {
  const set = jest.fn();
  const to = jest.fn();
  const registerPlugin = jest.fn();

  const gsapMock = {
    set,
    to,
    registerPlugin,
    timeline: jest.fn(() => ({ to: jest.fn(), from: jest.fn() })),
  };

  return {
    __esModule: true,
    default: gsapMock,
    ...gsapMock,
  };
});

jest.mock('gsap/ScrollTrigger', () => {
  return {
    __esModule: true,
    ScrollTrigger: {
      create: jest.fn(),
      kill: jest.fn(),
      refresh: jest.fn(),
    },
    default: {},
  };
});

jest.mock('gsap/ScrollToPlugin', () => {
  return {
    __esModule: true,
    ScrollToPlugin: {},
    default: {},
  };
});
