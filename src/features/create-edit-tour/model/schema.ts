import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { RefinementCtx, z } from 'zod';

dayjs.extend(isSameOrAfter);
dayjs.extend(customParseFormat);

export const PhotoMetaSchema = z
  .object({
    id: z.number(),
    isMain: z.boolean(),
    file: z
      .custom<File>((f) => typeof File === 'undefined' || f instanceof File)
      .optional()
      .refine(
        (file) => !file || ['image/jpeg', 'image/png'].includes(file.type),
        'Тільки JPG або PNG',
      )
      .refine(
        (file) => !file || file.size <= 5 * 1024 * 1024,
        'Файл не має перевищувати 5МБ',
      )
      .nullable(),
    url: z.url().optional().nullable(),
    description: z.string().optional().nullable(),
  })
  .refine((photo) => photo.file != null || photo.url != null, {
    message: 'Потрібно завантажити хоча б 1 фото',
  });

export const TourFormSchema = z
  .object({
    id: z.number().optional(),

    title: z
      .string()
      .trim()
      .min(3, 'Поле обовʼязкове. Має бути більше 3 символів.')
      .max(150, 'Максимально 150 символів.')
      .regex(
        /^(?!.*(--|''|""|\.\.|,,))(?!['" .,\-])[A-Za-zА-Яа-яЁёІіЇїЄєҐґ0-9'" .,\-]+$/,
        `Дозволені: літери, цифри, знаки . , - \n' \n" та пробіли. Не може бути повторюваних спецсимволів. Назва не може містити лише спецсимволи.`,
      ),

    description: z
      .string()
      .trim()
      .min(50, 'Поле обовʼязкове. Має бути більше 50 символів.')
      .max(5000, 'Максимум 5000 символів.'),

    countryISO2Code: z.string().nonempty('Поле обовʼязкове. Виберіть країну.'),

    cityId: z.number().int().positive('Поле обовʼязкове. Виберіть місто.'),

    availableSpots: z
      .number()
      .int('Має бути цілим числом.')
      .min(2, 'Поле обовʼязкове. Мінімум 2 місця.')
      .max(100, 'Максимум 100 місць.')
      .refine((val) => val % 2 === 0, {
        message: 'Кількість місць має бути парним числом.',
      }),

    price: z
      .string()
      .nonempty('Поле обовʼязкове.')
      .regex(
        /^\d+(\.\d{0,2})?$/,
        'Тільки числа, максимум 2 знаки після крапки',
      ),

    currency: z.enum(['USD', 'EUR', 'UAH']),

    startDate: z
      .string()
      .nonempty('Поле обовʼязкове.')
      .refine(
        (val) =>
          dayjs(val, 'YYYY-MM-DD', true).isSameOrAfter(dayjs().startOf('day')),
        {
          message: 'Дата початку не може бути в минулому.',
        },
      ),

    endDate: z.string().nonempty('Поле обовʼязкове.'),

    photos: z
      .array(PhotoMetaSchema)
      .min(1, 'Поле обовʼязкове. Мінімум 1 фото.')
      .max(10, 'Максимум 10 фото.'),
  })

  .refine(
    (data) =>
      dayjs(data.endDate, 'YYYY-MM-DD', true).isSameOrAfter(
        dayjs(data.startDate, 'YYYY-MM-DD', true),
        'day',
      ),
    {
      message: 'Дата закінчення не може бути раніше початку.',
      path: ['endDate'],
    },
  )

  // Cross-field validation for currency-dependent price ranges
  .superRefine((data, ctx: RefinementCtx) => {
    const numericPrice = parseFloat(data.price);

    if (isNaN(numericPrice)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Ціна має бути числом',
        path: ['price'],
      });
      return;
    }

    let min: number;
    let max: number;

    switch (data.currency) {
      case 'UAH':
        min = 100;
        max = 100000;
        break;
      case 'USD':
      case 'EUR':
        min = 5;
        max = 5000;
        break;
      default:
        return;
    }

    if (numericPrice < min || numericPrice > max) {
      ctx.addIssue({
        code: 'custom',
        message: `Ціна має бути в діапазоні ${min}–${max} ${data.currency}.`,
        path: ['price'],
      });
    }
  });

export type TourFormValues = z.infer<typeof TourFormSchema>;
