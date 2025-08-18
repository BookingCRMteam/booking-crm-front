import { matchIsValidTel } from 'mui-tel-input';
import { z } from 'zod';

const nameRegex = /^(?!.* {2})(?!.*-{2})(?!.*'{2})[\p{L}'-]+(?: [\p{L}'-]+)*$/u;

const stringWithValidNameChars = z
  .string()
  .min(2, { message: 'Введіть від 2 до 100 символів' })
  .max(100, { message: 'Введіть від 2 до 100 символів' })
  .regex(nameRegex, {
    message:
      'Дозволено лише літери, пробіли, дефіси (-) та апострофи (’). Не допускаються подвійні дефіси чи апострофи',
  });

export const operatorOnboardingSchema = z.object({
  // companyName: stringWithValidNameChars,
  // description: stringWithValidNameChars,
  firstName: stringWithValidNameChars,
  lastName: stringWithValidNameChars,
  email: z.email({ message: 'Введіть коректну адресу електронної пошти' }),
  phone: z
    .string()
    .refine(
      (value) => matchIsValidTel(value, { onlyCountries: ['UA', 'PL'] }),
      {
        message: 'Введіть коректний номер телефону',
      },
    ),
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
