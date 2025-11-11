import {
  ClockClockwiseIcon,
  ShieldCheckIcon,
  SketchLogoIcon,
} from '@phosphor-icons/react';

export const DETAIL_CARDS = [
  {
    id: 1,
    title: (
      <>
        Тільки <br /> авторські враження
      </>
    ),
    description:
      'Забудьте про туристичні маршрути. Кожна подорож створена пристрасним експертом, щоб показати вам справжню душу країни.',
    icon: <SketchLogoIcon size={48} />,
  },
  {
    id: 2,
    title: (
      <>
        Повна <br /> впевненість та безпека
      </>
    ),
    description:
      'Кожен наш партнер-туроператор проходить ретельний відбір. Ми гарантуємо безпеку вашої оплати, щоб ви могли повністю розслабитись.',
    icon: <ShieldCheckIcon size={48} />,
  },
  {
    id: 3,
    title: (
      <>
        Економія <br /> вашого часу
      </>
    ),
    description:
      'Ми вже виконали всю складну роботу. Вам залишається лише обрати тур, який відгукується вашому серцю, і готуватись до пригод.',
    icon: <ClockClockwiseIcon size={48} />,
  },
];
