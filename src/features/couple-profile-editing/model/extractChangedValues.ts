// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extractChangedValues = <T extends Record<string, any>>(
  dirtyFields: Partial<Record<keyof T, boolean>>,
  data: T,
): Partial<T> => {
  return Object.keys(dirtyFields).reduce((acc, key) => {
    const typedKey = key as keyof T;
    acc[typedKey] = data[typedKey];
    return acc;
  }, {} as Partial<T>);
};
