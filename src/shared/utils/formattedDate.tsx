export const formattedDate = (rawDate: string) => {
  const dateObject = new Date(rawDate);
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  } as const;

  return dateObject.toLocaleDateString('uk-UA', options);
};
