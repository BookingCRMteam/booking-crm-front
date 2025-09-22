export function getChangedValues<T extends Record<string, unknown>>(
  initial: T,
  current: T,
): Partial<T> {
  const result = {} as Partial<T>;

  for (const key of Object.keys(current) as Array<keyof T>) {
    const prev = initial[key];
    const next = current[key];

    // Нормалізуємо null і '' як "однаково пусті"
    const normalize = (val: unknown) =>
      val === null || val === '' ? undefined : val;

    if (normalize(prev) !== normalize(next)) {
      result[key] = next;
    }
  }

  return result;
}
