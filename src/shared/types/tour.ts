export interface Tour {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  included: string[];
}

// Моковані дані турів (це буде API)
export const TOURS: Tour[] = [
  {
    id: 1,
    name: 'Тур 1',
    description: 'Опис туру 1',
    price: 1000,
    duration: '7 днів',
    location: 'Карпати',
    included: ['Проживання', 'Харчування', 'Трансфер'],
  },
  {
    id: 2,
    name: 'Тур 2',
    description: 'Опис туру 2',
    price: 1500,
    duration: '5 днів',
    location: 'Львів',
    included: ['Проживання', 'Екскурсії'],
  },
  {
    id: 3,
    name: 'Тур 3',
    description: 'Опис туру 3',
    price: 2000,
    duration: '10 днів',
    location: 'Одеса',
    included: ['Проживання', 'Харчування', 'Екскурсії', 'Трансфер'],
  },
  {
    id: 4,
    name: 'Тур 4',
    description: 'Опис туру 4',
    price: 1200,
    duration: '3 дні',
    location: 'Київ',
    included: ['Проживання', 'Екскурсії'],
  },
  {
    id: 5,
    name: 'Тур 5',
    description: 'Опис туру 5',
    price: 1800,
    duration: '6 днів',
    location: 'Буковель',
    included: ['Проживання', 'Харчування', 'Спорядження'],
  },
  {
    id: 6,
    name: 'Тур 6',
    description: 'Опис туру 6',
    price: 2500,
    duration: '12 днів',
    location: 'Закарпаття',
    included: ['Проживання', 'Харчування', 'Екскурсії', 'Трансфер', 'СПА'],
  },
];
