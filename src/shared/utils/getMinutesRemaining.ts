export const getMinutesRemaining = (expiresAt: string): number => {
  const total = Date.parse(expiresAt) - Date.parse(new Date().toISOString());
  const minutes = Math.ceil(total / 1000 / 60);

  return minutes > 0 ? minutes : 0;
};
