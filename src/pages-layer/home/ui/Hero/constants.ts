export const HERO_TITLE_PARTS = [
  { text: 'Подорожі, створені для ' },
  { text: 'вашої історії ', accent: true },
  { text: 'кохання' },
];

export const HERO_DESCRIPTION = `Відкрийте для себе авторські тури, відібрані вручну,
щоб ви могли просто насолоджуватись моментами, 
а не плануванням`;

export type AdvantagesType = {
  id: number;
  title: string;
  isSeparator: boolean;
  direction: 'right' | 'left' | null;
};

export const ADVANTAGES_ITEMS: AdvantagesType[] = [
  {
    id: 1,
    title: 'Тільки перевірені організатори',
    isSeparator: true,
    direction: 'right',
  },
  {
    id: 2,
    title: 'Безпечна оплата',
    isSeparator: false,
    direction: null,
  },
  {
    id: 3,
    title: 'Підтримка на кожному етапі',
    isSeparator: true,
    direction: 'left',
  },
];
