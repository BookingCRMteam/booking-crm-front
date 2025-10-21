import '@testing-library/jest-dom';

// eslint-disable-next-line @typescript-eslint/no-require-imports
jest.mock('next/image', () => require('./src/jest/mocks/nextImage'));
