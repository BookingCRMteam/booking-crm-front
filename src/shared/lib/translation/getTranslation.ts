type TranslationEntry = {
  languageCode: string;
  name: string;
};

export const getTranslation = (
  translations: TranslationEntry[] | undefined,
  lang: string,
  fallback = 'Unknown',
): string => {
  return translations?.find((t) => t.languageCode === lang)?.name ?? fallback;
};
