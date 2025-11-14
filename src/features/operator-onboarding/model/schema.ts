import { matchIsValidTel } from 'mui-tel-input';
import { z } from 'zod';

const trueBooleanSchema = z.boolean().refine((val) => val === true, {
  message: 'Value must be true',
});

// лише літери, апострофи і дефіси
const onlyValidCharsRegex = /^[\p{L}'-]+$/u;

// заборона подвійних дефісів і апострофів
const noDoubleSymbolsRegex = /^(?!.*-{2})(?!.*'{2}).*$/u;

// заборона дефісів на початку і в кінці
const noEdgeHyphenRegex = /^(?!-)(?!.*-$).*$/;

export const stringWithValidNameChars = z
  .string()
  .min(2, { message: 'Введіть від 2 до 50 символів' })
  .max(50, { message: 'Введіть від 2 до 50 символів' })
  .regex(onlyValidCharsRegex, {
    message: 'Дозволено лише літери, дефіси (-) та апострофи (’).',
  })
  .regex(noDoubleSymbolsRegex, {
    message: 'Не допускаються подвійні дефіси чи апострофи.',
  })
  .regex(noEdgeHyphenRegex, {
    message: 'Дефіс не може бути на початку або в кінці.',
  });

export const operatorOnboardingSchema = z.object({
  firstName: stringWithValidNameChars,
  lastName: stringWithValidNameChars,
  phone: z.string().refine((value) => matchIsValidTel(value), {
    message: 'Введіть коректний номер телефону',
  }),
  accept: trueBooleanSchema,
  website: z
    .url({
      protocol: /^https?$/,
      hostname: z.regexes.domain,
      message:
        'Посилання має починатися з http:// або https:// і не містити пробілів (наприклад: https://example.com)',
    })
    .max(255, {
      message: 'Довжина посилання не може перевищувати 255 символів',
    }),
});

export type OperatorOnboardingSchemaValues = z.infer<
  typeof operatorOnboardingSchema
>;
