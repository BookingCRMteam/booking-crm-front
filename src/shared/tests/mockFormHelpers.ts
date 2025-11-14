export const createMockHandleSubmit = () =>
  jest.fn((fn) => (e: React.FormEvent<HTMLFormElement>) => {
    fn(e);
    e.preventDefault();
  });
