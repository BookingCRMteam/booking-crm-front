import { matchIsValidTel } from 'mui-tel-input';
import { z } from 'zod';

// лише літери, апострофи і дефіси
const onlyValidCharsRegex = /^[\p{L}'-]+$/u;

// заборона подвійних дефісів і апострофів
const noDoubleSymbolsRegex = /^(?!.*-{2})(?!.*'{2}).*$/u;

// заборона дефісів на початку і в кінці
const noEdgeHyphenRegex = /^(?!-)(?!.*-$).*$/;

export const stringWithValidNameChars = z
  .string()
  .min(2, { message: 'Введіть від 2 до 100 символів' })
  .max(100, { message: 'Введіть від 2 до 100 символів' })
  .regex(onlyValidCharsRegex, {
    message: 'Дозволено лише літери, дефіси (-) та апострофи (’).',
  })
  .regex(noDoubleSymbolsRegex, {
    message: 'Не допускаються подвійні дефіси чи апострофи.',
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
