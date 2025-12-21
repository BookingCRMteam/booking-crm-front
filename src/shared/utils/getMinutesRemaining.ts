export const getMinutesRemaining = (expiresAt: string): number => {
  const expiresAtMs = Date.parse(expiresAt);

  if (isNaN(expiresAtMs)) {
    return 0;
  }

  const total = expiresAtMs - Date.now();
  const minutes = Math.ceil(total / 1000 / 60);
  return minutes > 0 ? minutes : 0;
};
