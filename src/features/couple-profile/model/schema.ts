import { matchIsValidTel } from 'mui-tel-input';
import { z } from 'zod';

// літери, апострофи (прямий ' та ’), дефіси та пробіли між словами
const onlyValidCharsRegex = /^[\p{L}\u2019'\-\s]+$/u;

// заборона подвійних дефісів і апострофів
const noDoubleSymbolsRegex = /^(?!.*-{2})(?!.*['\u2019]{2}).*$/u;

// заборона дефісів на початку і в кінці
const noEdgeHyphenRegex = /^(?!-)(?!.*-$).*$/;

// заборона подвійних пробілів та пробілу на початку/в кінці
const noDoubleSpacesRegex = /^(?!.*\s{2,}).*$/u;
const noEdgeSpaceRegex = /^(?!\s)(?!.*\s$).*$/u;

export const stringWithValidNameChars = z
  .string()
  .min(2, { message: 'Введіть від 2 до 100 символів.' })
  .max(100, { message: 'Введіть від 2 до 100 символів.' })
  .regex(onlyValidCharsRegex, {
    message: 'Дозволено лише літери, пробіли, дефіси (-) та апострофи (’)',
  })
  .regex(noDoubleSymbolsRegex, {
    message: 'Не допускаються подвійні дефіси чи апострофи.',
  })
  .regex(noDoubleSpacesRegex, {
    message: 'Не допускаються подвійні пробіли.',
  })
  .regex(noEdgeSpaceRegex, {
    message: 'Пробіл не може бути на початку або в кінці.',
  })
  .regex(noEdgeHyphenRegex, {
    message: 'Дефіс не може бути на початку або в кінці.',
  });

export const coupleProfileSchema = z.object({
  firstPersonName: stringWithValidNameChars.nullish(),
  firstPersonSurname: stringWithValidNameChars.nullish(),
  secondPersonName: stringWithValidNameChars.nullish(),
  secondPersonSurname: stringWithValidNameChars.nullish(),
  phone: z
    .string()
    .refine((value) => matchIsValidTel(value), {
      message: 'Введіть коректний номер телефону',
    })
    .nullish(),
  email: z.email().nullish(),
});

export type CoupleProfileSchemaValues = z.infer<typeof coupleProfileSchema>;
