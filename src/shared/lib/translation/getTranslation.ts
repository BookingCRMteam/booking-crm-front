type Translation = {
  languageCode: string;
  name: string;
};

export const getTranslation = (
  translations: Translation[] | undefined,
  lang: string,
  fallback = 'Unknown',
): string => {
  return translations?.find((t) => t.languageCode === lang)?.name ?? fallback;
};
