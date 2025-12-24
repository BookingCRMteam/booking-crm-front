export const getPluralMinutes = (count: number): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'хвилин';
  }
  if (lastDigit === 1) {
    return 'хвилина';
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'хвилини';
  }
  return 'хвилин';
};
