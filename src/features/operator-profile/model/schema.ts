import { z } from 'zod';

const IMAGE_UPLOAD = {
  MAX_SIZE_MB: 5,
  MAX_SIZE_BYTES: 5 * 1024 * 1024,
  ACCEPTED_TYPES: ['image/png', 'image/jpeg'],
};

const hasHtmlTags = (text: string) => {
  const htmlTagRegex = /<\/?[a-z][\w:-]*(?:\s+[^<>]*)?>/i;
  return htmlTagRegex.test(text);
};

const textWithMaxLength = (maxLength: number) =>
  z
    .string()
    .max(maxLength, {
      message: `Максимальна довжина — ${maxLength} символів`,
    })
    .trim()
    .refine((value) => !hasHtmlTags(value), {
      message: 'HTML-теги заборонені',
    })
    .optional()
    .or(z.literal(''));

const imageFileSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size <= IMAGE_UPLOAD.MAX_SIZE_BYTES,
    `Файл має бути менше ${IMAGE_UPLOAD.MAX_SIZE_MB} МБ`,
  )
  .refine(
    (file) => IMAGE_UPLOAD.ACCEPTED_TYPES.includes(file.type),
    'Дозволено лише JPG або PNG',
  );

export const operatorProfileSchema = z.object({
  philosophy: textWithMaxLength(1000),
  description: textWithMaxLength(500),
  photo: imageFileSchema.optional(),
  removePhoto: z.boolean().optional(),
});

export type OperatorProfileSchemaValues = z.infer<typeof operatorProfileSchema>;
