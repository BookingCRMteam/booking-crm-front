import { Tour, TourPhotoFront } from '@/entities/tour/model/types';

import { TourFormValues } from '../model/schema';

export function transformBackendToFormValues(data: Tour): TourFormValues {
  const allowedCurrencies: TourFormValues['currency'][] = ['USD', 'EUR', 'UAH'];

  const currency: TourFormValues['currency'] = allowedCurrencies.includes(
    data.currency as TourFormValues['currency'],
  )
    ? (data.currency as TourFormValues['currency'])
    : 'UAH';

  const values = {
    title: data.title ?? '',
    description: data.description ?? '',
    countryISO2Code: data.countryISO2Code ?? '',
    cityId: data.cityId ?? 0,
    availableSpots: data.availableSpots ?? 0,
    price: isNaN(Number(data.price)) ? 0 : Number(data.price),
    currency,
    startDate: data.startDate ?? '',
    endDate: data.endDate ?? '',
    photos:
      data.photos?.map<TourPhotoFront>((p) => ({
        id: String(p.id),
        url: p.url ?? undefined,
        file: null,
        isMain: p.isMain,
      })) ?? [],
  };

  return values;
}
