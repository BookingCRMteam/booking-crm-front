export type Booking = {
  id: number;
  title: string;
  price: string;
  phone: string;
  data: string;
  customer: string;
};

export const OPERATOR_BOOKINGS: Booking[] = [
  {
    id: 1,
    title: 'Романтична Флоренція',
    customer: 'Анна та Марк',
    phone: '+380931234567',
    data: '01.10.25 — 07.10.25',
    price: '78 567',
  },
  {
    id: 2,
    title: 'Романтична Флоренція',
    customer: 'Анна та Марк',
    phone: '+380931234567',
    data: '01.10.25 — 07.10.25',
    price: '78 567',
  },
  {
    id: 3,
    title: 'Романтична Флоренція',
    customer: 'Анна та Марк',
    phone: '+380931234567',
    data: '01.10.25 — 07.10.25',
    price: '78 567',
  },
];
